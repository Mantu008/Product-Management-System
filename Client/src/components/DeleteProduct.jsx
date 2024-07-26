import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    let data = await fetch("http://localhost:2000/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:2000/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    alert("Item Delete successfully.");
    navigate("/");
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((product) => (
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
          key={product.id}
        >
          <div
            className="rounded overflow-hidden shadow-lg bg-slate-400"
            key={product.id}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">
                <strong>Product Code:</strong> {product.productCode}
              </p>
              <p className="text-gray-700 text-base">
                <strong>HSN:</strong> {product.hsn}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Sales Price:</strong> ${product.salesPrice}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Purchase Price:</strong> ${product.purchasePrice}
              </p>
              <button
                className="bg-blue-700 p-1.5 rounded-md w-full mt-2 text-md font-semibold"
                onClick={() => handleDelete(product._id)}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeleteProduct;
