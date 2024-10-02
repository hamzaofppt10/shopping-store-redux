import { ShoppingBag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [totalItems , setTotalItems] = useState()
    const cart = useSelector(state => state.cart)

    useEffect(() =>{
        setTotalItems(cart.reduce((total , acc) => total + acc.quantity , 0))
    } , [cart])
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">Shopping Store</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="text-gray-300 hover:text-white relative"><ShoppingBag /><span className='absolute top-0 -right-1 bg-red-500 rounded-full text-[10px] px-1'>{totalItems && totalItems}</span></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
