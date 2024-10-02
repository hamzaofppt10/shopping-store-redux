import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, deleteProduct } from '../redux/actions';
import { Minus, Plus, Trash } from 'lucide-react';

const Cart = () => {
    const [total , setTotal] = useState()

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };
  
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  useEffect(() =>{
    setTotal(cart.reduce((total , acc)=> total + acc.price * acc.quantity , 0))
  }, [cart])



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center">
                <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">Price: ${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleIncrement(item.id)} 
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  <Plus />
                </button>
                <button 
                  onClick={() => handleDecrement(item.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                >
                  <Minus />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
          <span className='font-bold text-lg'>Total :  {parseInt(total).toFixed(2)} $</span>
         
        </div>
      )}
    </div>
  );
};

export default Cart;
