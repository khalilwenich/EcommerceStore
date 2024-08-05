"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/pageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";

// Define a type for the product
type Product = {
    id: string;
    name: string;
    price: number;
    isAvailableForPurchase: boolean;
    _count: {
        orders: number;
    };
};

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductTable />
        </>
    );
}

function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const products = await db.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isAvailableForPurchase: true,
                    _count: { select: { orders: true } }
                },
                orderBy: { name: "asc" }
            });
            setProducts(products);
        }

        fetchProducts();
    }, []);

    if (products.length === 0) return <p>No products found</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailableForPurchase ? (
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2 />
                                </>
                            ) : (
                                <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle />
                                </>
                            )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price / 1000)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <MoreVertical />
                            <span className="sr-only">Actions</span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
