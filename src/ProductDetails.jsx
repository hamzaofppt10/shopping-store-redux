import {
  Star,
  Truck,
  Package,
  RotateCcw,
  QrCode,
  ArrowLeftSquare,
  ArrowLeft,
  Minus,
  Trash,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, deleteProduct } from "./redux/actions";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const onAddToCart = (product) => {
    console.log(product);
    dispatch(addToCart(product));
  };

  const onReduceToCart = (id) => {
    dispatch(decrement(id));
  };

  const deleteFromCart = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost">
        <Link to={"/"} className="flex items-center">
          <ArrowLeft /> Return to home
        </Link>
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images && product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            className="m-auto h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating} rating)
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${parseInt(product.price).toFixed(2)}
            </span>
            <Badge className="ml-2 bg-green-500">
              {product.discountPercentage}% OFF
            </Badge>
          </div>
          <div className="mb-4">
            <Badge variant="" className="mr-2">
              {product.category}
            </Badge>
            {product.tags &&
              product.tags.map((tag) => (
                <Badge key={tag} variant="" className="mr-2">
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="flex items-center mb-4">
            <Package className="w-5 h-5 mr-2" />
            <span className="text-sm text-gray-600">SKU: {product.sku}</span>
          </div>
          <div className="flex items-center mb-4">
            <Truck className="w-5 h-5 mr-2" />
            <span className="text-sm text-gray-600">
              {product.shippingInformation}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <RotateCcw className="w-5 h-5 mr-2" />
            <span className="text-sm text-gray-600">
              {product.returnPolicy}
            </span>
          </div>
          {cart.find((el) => el.id === product.id) ? (
            <div className="flex space-x-2">
              <Button
                onClick={() => onReduceToCart(product.id)}
                variant="outline"
              >
                <Minus />
              </Button>
              <Button
                onClick={() => deleteFromCart(product.id)}
                variant="destructive"
              >
                <Trash />
              </Button>
              <Button onClick={() => onAddToCart(product)} variant="outline">
                <Plus />
              </Button>
            </div>
          ) : (
            <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
          )}
          <p className="text-sm text-gray-600 mb-2">
            Availability:{" "}
            <span className="font-semibold text-red-500">
              {product.availabilityStatus}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Minimum Order Quantity: {product.minimumOrderQuantity}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <Card>
            <CardContent className="p-4">
              <p className="mb-2">
                <strong>Brand:</strong> {product.brand}
              </p>
              <p className="mb-2">
                <strong>Weight:</strong> {product.weight} oz
              </p>
              {/* <p className="mb-2"><strong>Dimensions:</strong> {product.dimensions.width}" x {product.dimensions.height}" x {product.dimensions.depth}"</p> */}
              <p className="mb-2">
                <strong>Warranty:</strong> {product.warrantyInformation}
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {product.reviews &&
            product.reviews.map((review, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    By {review.reviewerName}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <Separator className="my-8" />
    </div>
  );
}
