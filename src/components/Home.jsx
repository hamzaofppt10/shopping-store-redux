import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, addToCart, decrement } from "../redux/actions";
import { Minus, Plus, Star, Trash } from "lucide-react";

const Home = () => {
    const dispatch = useDispatch();
    const [products , setProducts] = useState([])

    const cart = useSelector(state => state.cart)
    useEffect(() =>{
    fetch('https://dummyjson.com/products').then(res => res.json()).then(data  => {setProducts(data.products)})
    }, [])
    const onAddToCart= (product) =>{
        console.log(product)
        dispatch(addToCart(product)) 
    }

    const onReduceToCart = (id) => {
        dispatch(decrement(id));
      };

      const deleteFromCart = (id ) => {
        dispatch(deleteProduct(id))
      }
  

  return (
    <div className="grid grid-cols-4 gap-4 p-5">
      {products && products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow-md overflow-hidden p-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover mb-4"
            height={300}
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 text-xl font-semibold">${product.price}</p>
          <p className="text-xs flex">
            {new Array(5).fill(null).map((_ , pos) => (
                <Star key={pos} className={`${Math.round(product.rating) > pos ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-400 text-gray-400'}`}/>
            ))}
          </p>
          <p className="text-sm text-red-500">
            Stock: {product.availabilityStatus}
          </p>
          {cart.find(el => el.id === product.id) ? <><button
            onClick={() => onReduceToCart(product.id)}
            className="mt-4  mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Minus />
          </button>
          <button  
            onClick={() => deleteFromCart(product.id)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <Trash />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-4 mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
           <Plus />
          </button></> :
          <button
            onClick={() => onAddToCart(product)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>}
          
        </div>
      ))}
    </div>
  );
};

export default Home;

