import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, addToCart, decrement } from "./redux/actions";
import { Eye, Minus, Pen, Plus, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  

  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch({type : 'SET_PRODUCTS' , payload : data.products} );
        ;
      });
  }, [dispatch]);

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

  return (
    <div className="grid grid-cols-4 gap-4 p-5">
      {products.length &&
        products.map((product) => (
          <Card key={product.id} className="shadow-md">
            <CardHeader>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-64 object-cover mb-4"
              />
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <p className="mt-2">${product.price}</p>
              <p className="text-xs flex mt-1">
                {new Array(5).fill(null).map((_, pos) => (
                  <Star
                    key={pos}
                    className={`${
                      Math.round(product.rating) > pos
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-400 text-gray-400"
                    }`}
                  />
                ))}
              </p>
              <Separator className="my-2" />
              <Badge
                className={`text-sm  w-fit`}
                variant={`${
                  product.availabilityStatus === "Low Stock"
                    ? "destructive"
                    : ""
                }`}
              >
                Stock : {product.availabilityStatus}
              </Badge>
            </CardHeader>
            <CardContent className="flex gap-2 w-full">
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
                  <Button
                    onClick={() => onAddToCart(product)}
                    variant="outline"
                  >
                    <Plus />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
              )}

              <Button variant="outline">
                <Link to={`/details/${product.id}`} className="flex">
                  View <Eye className="ml-1" />
                </Link>
              </Button>
              <Button className="bg-green-500">
                <Link to={`/update/${product.id}`} className="flex">
                  Update <Pen className="ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Home;
