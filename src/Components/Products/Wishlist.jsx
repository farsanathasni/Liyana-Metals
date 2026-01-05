import { Link } from "react-router-dom";
import { useWishlist } from "../../Contexts/WishList";
import Navbar from "../Layout/Navbar";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <p>
            Wishlist is empty.{" "}
            <Link to="/products" className="text-amber-600 underline">
              Shop now
            </Link>
          </p>
        ) : (
          <ul className="space-y-4">
            {wishlist.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-amber-600 font-bold">{item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Wishlist