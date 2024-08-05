"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";

export function ProductForm({ onProductAdded }) {
  const [price, setPrice] = useState<number | string>("");
  const [showNotification, setShowNotification] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    let currentErrors = {};
    if (!formData.get("name")) {
      currentErrors = { ...currentErrors, name: "Required" };
    }
    if (!formData.get("price") || isNaN(Number(formData.get("price")))) {
      currentErrors = { ...currentErrors, price: "Expected number, received NaN" };
    }
    if (!formData.get("description")) {
      currentErrors = { ...currentErrors, description: "Required" };
    }
    if (!formData.get("file")) {
      currentErrors = { ...currentErrors, file: "Required" };
    }
    if (!formData.get("image")) {
      currentErrors = { ...currentErrors, image: "Required" };
    }

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) {
      setIsPending(false);
      return;
    }

    try {
      const result = await addProduct(formData);
      if (result) {
        setErrors(result);
      } else {
        setErrors({});
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
        if (onProductAdded) onProductAdded(); // Call the callback to indicate a product has been added
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
          {errors.name && <div className="text-destructive">{errors.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price in Millimes</Label>
          <Input
            type="number"
            id="price"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="text-muted-foreground">
            {formatCurrency((Number(price) || 0) / 1000)}
          </div>
          {errors.price && <div className="text-destructive">{errors.price}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" required />
          {errors.description && <div className="text-destructive">{errors.description}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required />
          {errors.file && <div className="text-destructive">{errors.file}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required />
          {errors.image && <div className="text-destructive">{errors.image}</div>}
        </div>
        <SubmitButton pending={isPending} />
      </form>
      {showNotification && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-md animate-fade-in-out">
          <p>Save successful!</p>
        </div>
      )}
    </div>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
