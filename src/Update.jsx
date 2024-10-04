"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function ProductUpdateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch()
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    // Fetch the product data and set it to state
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
            id : data.id ,
          title: data.title,
          description: data.description,
          price: data.price,
          rating: data.rating,
          image: data.thumbnail,
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('products ' ,product)
    dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            rating: product.rating,
            image: product.image,
        },
    });
    
    console.log(products);
    
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block font-medium mb-2">Title</label>
          <Input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product title"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Description</label>
          <Textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product description"
            className="resize-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Price</label>
          <Input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            placeholder="Product price"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Rating</label>
          <Input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            step="0.1"
            max={5}
            placeholder="Product rating"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Image URL</label>
          <Input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <div>
          <p>Current image : </p>
          <img src={product.image} alt="" />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
