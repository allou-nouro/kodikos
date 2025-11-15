import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3 } from "lucide-react";
import { useState } from "react";

// import icons
import { MdHome, MdDashboard, MdChat, MdInfo, MdContactPage,MdStore  } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();


const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={20} /> },
  { name: "Stock Managment", path: "/stock", icon: <MdStore size={20} /> },
  { name: "Mitro", path: "/chat", icon: <img src="./images/Vector (1).png" style={{width:'25px'}} />},
  { name: "About", path: "/about", icon: <MdInfo size={20} /> },
  { name: "Contact", path: "/contact", icon: <MdContactPage size={20} /> },
];


  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{
      display:'flex',
      flexDirection:'column',

    }}>
      <div className="container mx-auto px-4">
        <div style={{
          display:'flex',
          flexDirection:'column',
          gap:'10px',
          width:'fit-content',
          height:'100vh',
          position:'fixed',
          left:'0',
          zIndex:'10',
          padding:'20px 30px 0 10px',
          boxShadow:'#0000002b 2px 0px 4px',
          background:'white',
          rowGap:'50px'


        }}  >
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <img src="./images/Vector.png" alt="" style={{width:'240px',paddingTop:'20px',margin:'auto'}} />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex flex-col " style={{height:'40vh', justifyContent:'space-between'}}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{ background: isActive(link.path) ? "#8371F9" : undefined ,color:isActive(link.path) ? "#fff" : undefined,padding:'15px',borderRadius:'100px',transition:'0.2s',fontSize:'15px',display:'flex',justifyContent:'start',alignItems:'center',gap:'10px' ,
                  width:'260px'
                }}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <Button size="sm" variant="gradient">Get Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="mt-2 w-full">Get Demo</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
