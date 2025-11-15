import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  sku: z.string().min(1, "SKU is required"),
  supplier: z.string().min(1, "Supplier is required"),
  quantity: z.coerce.number().int().min(0, "Quantity must be at least 0"),
  description: z.string().min(1, "Description is required"),
  wholesalePrice: z.string().min(1, "Wholesale price is required"),
  price: z.string().min(1, "Price is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      quantity: 0,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    console.log("Product Data:", {
      ...data,
      promotionalMaterials: files,
    });

    toast({
      title: "Product Added",
      description: "Your product has been successfully added to inventory.",
    });

    reset();
    setFiles([]);
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    setFiles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-semibold">
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Product Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              placeholder="e.g. Premium Coffee Beans"
              {...register("title")}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              placeholder="SKU here"
              {...register("sku")}
              className={errors.sku ? "border-destructive" : ""}
            />
            {errors.sku && (
              <p className="text-sm text-destructive">{errors.sku.message}</p>
            )}
          </div>

          {/* Supplier + Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                placeholder="Supplier here"
                {...register("supplier")}
                className={errors.supplier ? "border-destructive" : ""}
              />
              {errors.supplier && (
                <p className="text-sm text-destructive">{errors.supplier.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity")}
                className={errors.quantity ? "border-destructive" : ""}
              />
              {errors.quantity && (
                <p className="text-sm text-destructive">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of your product"
              rows={4}
              {...register("description")}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Wholesale Price + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wholesalePrice">Wholesale Price</Label>
              <Input
                id="wholesalePrice"
                placeholder="e.g. $19.99"
                {...register("wholesalePrice")}
                className={errors.wholesalePrice ? "border-destructive" : ""}
              />
              {errors.wholesalePrice && (
                <p className="text-sm text-destructive">
                  {errors.wholesalePrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="e.g. $29.99"
                {...register("price")}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Promotional Materials (Input ظاهر مباشرة) */}
          <div className="space-y-2">
            <Label htmlFor="promotional">Promotional Materials</Label>

            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload promotional images
                </p>

                {/* File input أصبح ظاهر مباشرة */}
                <Input
                  id="promotional"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border p-2 rounded w-full cursor-pointer"
                />

                {files.length > 0 && (
                  <p className="text-sm text-foreground mt-2">
                    {files.length} file{files.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
