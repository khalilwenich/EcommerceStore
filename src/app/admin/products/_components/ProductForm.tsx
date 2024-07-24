"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";

export function ProductForm() {
  const [priceInDinars, setPriceInDinars] = useState<number>();
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await addProduct(formData);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceInDinars">Price in Millimes</Label>
          <Input
            type="number"
            id="priceInDinars"
            name="priceInDinars"
            required
            value={priceInDinars}
            onChange={(e) =>
              setPriceInDinars(Number(e.target.value) || undefined)
            }
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInDinars || 0) / 1000)}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Description">Description</Label>
          <Input id="Description" name="Description" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required />
        </div>
        <Button type="submit">Save</Button>
      </form>
      {showNotification && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-md animate-fade-in-out">
          <p>Save successful!</p>
        </div>
      )}
    </div>
  );
}

function SubmitButton(){
    const {pending} =useFormStatus()

    return <Button type="submit" disabled={pending}>{pending ? "Saving...":"Save"}</Button>
}
