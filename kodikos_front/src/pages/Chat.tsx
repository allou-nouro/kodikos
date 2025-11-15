import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

// --- API Configuration and Helper Functions ---
const API_KEY = "AIzaSyAcNVz7vb5AjPskFanXxFj2AiqbLxcyqKo";
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
const SYSTEM_PROMPT = "You are an expert AI assistant providing insights and analysis specifically on the Algerian e-commerce market, product recommendations, and local market trends. Your tone is professional, knowledgeable, and helpful. Always strive to ground your responses using real-time, current market information when asked for data or trends.";

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1000;

async function fetchWithExponentialBackoff(url: string, options: RequestInit): Promise<Response> {
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await fetch(url, options);
            if (response.status !== 429 && response.ok) {
                return response;
            } else if (response.status === 429) {
                const delay = BASE_DELAY_MS * Math.pow(2, i) + Math.random() * 500;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw new Error(`API returned status code ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            if (i === MAX_RETRIES - 1) {
                console.error("Fetch failed after all retries:", error);
                throw error;
            }
            const delay = BASE_DELAY_MS * Math.pow(2, i) + Math.random() * 500;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Maximum retries reached.");
}

// --- Type Definitions ---
interface CardProps {
    children: React.ReactNode;
    className?: string;
}

interface ButtonProps {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
    className?: string;
    size?: "default" | "icon";
    variant?: "default" | "outline";
}

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    disabled: boolean;
    className?: string;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface GroundingAttribution {
    web?: {
        uri?: string;
        title?: string;
    };
}

interface MarkdownTextProps {
    content: string;
}

// --- Component Replacements ---
const Card: React.FC<CardProps> = ({ children, className = "" }) => (
    <div className={`rounded-xl border bg-white text-gray-900 shadow-xl ${className}`}>
        {children}
    </div>
);

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className = "", size = "default", variant = "default" }) => {
    let sizeClasses = "h-10 px-4 py-2";
    if (size === "icon") sizeClasses = "h-10 w-10 p-2";

    let variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
    if (variant === "outline") variantClasses = "border border-gray-300 text-gray-700 hover:bg-gray-50";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md ${sizeClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

const Input: React.FC<InputProps> = ({ value, onChange, onKeyPress, placeholder, disabled, className = "" }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
    />
);

const MarkdownText: React.FC<MarkdownTextProps> = ({ content }) => {
    const renderContent = (text: string) => {
        const parts: React.ReactNode[] = [];
        let currentText = text;

        // Process Links: [- [Title](URI)]
        const linkRegex = /-\s*\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let lastIndex = 0;

        while ((match = linkRegex.exec(currentText)) !== null) {
            const [fullMatch, title, uri] = match;
            const before = currentText.substring(lastIndex, match.index);
            
            if (before.length > 0) {
                const lines = before.split('\n');
                lines.forEach((line, i) => {
                    if (line) {
                        const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        parts.push(
                            <span 
                                key={`text-l-${lastIndex}-${i}`} 
                                className="block"
                                dangerouslySetInnerHTML={{ __html: processedLine }}
                            />
                        );
                    }
                    if (i < lines.length - 1) parts.push(<br key={`br-${lastIndex}-${i}`} />);
                });
            }

            parts.push(
                <div key={uri} className="mt-2 block">
                    <span className="font-semibold text-xs mr-1 text-gray-500">- </span>
                    <a 
                        href={uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-blue-500 hover:text-blue-700 underline transition-colors"
                    >
                        {title}
                    </a>
                </div>
            );
            
            lastIndex = match.index + fullMatch.length;
        }

        // Render remaining text
        const remaining = currentText.substring(lastIndex);
        if (remaining.length > 0) {
            const lines = remaining.split('\n');
            lines.forEach((line, i) => {
                if (line.trim()) {
                    const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    parts.push(
                        <span 
                            key={`text-r-${lastIndex}-${i}`} 
                            className="block"
                            dangerouslySetInnerHTML={{ __html: processedLine }}
                        />
                    );
                }
                if (i < lines.length - 1) parts.push(<br key={`br-r-${lastIndex}-${i}`} />);
            });
        }
        
        return parts;
    };

    return <div className="text-sm leading-relaxed">{renderContent(content)}</div>;
};

// --- Main App Component ---
const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Welcome! I'm your AI analyst specializing in Algerian e-commerce. Ask me about product trends, logistics challenges, or anything else about the local market.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        const userQuery = input.trim();
        if (!userQuery || isLoading) return;

        const userMessage: Message = { role: "user", content: userQuery };
        
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
            };

            const response = await fetchWithExponentialBackoff(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const candidate = result.candidates?.[0];
            let assistantText = "Sorry, I couldn't get a coherent response from the AI. The service might be temporarily unavailable. Please try again.";
            let sources: { uri: string; title: string; }[] = [];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                assistantText = candidate.content.parts[0].text;
                
                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    sources = (groundingMetadata.groundingAttributions as GroundingAttribution[])
                        .map((attribution) => ({
                            uri: attribution.web?.uri,
                            title: attribution.web?.title,
                        }))
                        .filter((source): source is { uri: string; title: string } => 
                            !!source.uri && !!source.title
                        );
                }
                
                if (sources.length > 0) {
                    assistantText += "\n\n**Sources:**\n" + sources.map(s => `- [${s.title}](${s.uri})`).join("\n");
                }
            }

            const aiResponse: Message = {
                role: "assistant",
                content: assistantText,
            };
            
            setMessages((prev) => [...prev, aiResponse]);
            
        } catch (error) {
            console.error("AI API Call Failed:", error);
            const errorResponse: Message = {
                role: "assistant",
                content: "Oops! I encountered an error connecting to the AI service. Please check the console for network or API details.",
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-12">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
           
                </div>

                <Card className="chat">
                    {/* Chat Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 rounded-t-xl">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 ${
                                    message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                {message.role === "assistant" && (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-md">
                                        <Bot className="w-5 h-5 text-blue-600" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-xl p-4 shadow-lg ${
                                        message.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                                    }`}
                                >
                                    <MarkdownText content={message.content} />
                                </div>
                                {message.role === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-blue-600 animate-pulse" />
                                </div>
                                <div className="bg-gray-100 rounded-xl p-4 shadow-lg rounded-tl-none">
                                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-gray-50 rounded-b-xl">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={isLoading ? "Waiting for AI response..." : "Ask about Algerian market trends or products..."}
                                disabled={isLoading}
                                className="flex-1 border-gray-300 focus:border-blue-500"
                            />
                            <Button
    onClick={handleSend}
    disabled={isLoading || !input.trim()}
    size="icon"
    className="shadow-xl bg-[#8371F9]"
>
    {isLoading
        ? <Loader2 className="w-4 h-4 animate-spin" />
        : <Send className="w-4 h-4 text-white" />
    }
</Button>

                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default App;