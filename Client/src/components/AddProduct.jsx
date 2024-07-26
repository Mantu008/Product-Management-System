import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const AddProducts = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const productCodeRef = useRef();
  const hsnRef = useRef();
  const salesPriceRef = useRef();
  const purchasePriceRef = useRef();
  const [error, setError] = useState(false);

  const handleAddProduct = async () => {
    const name = nameRef.current.value;
    const productCode = productCodeRef.current.value;
    const hsn = hsnRef.current.value;
    const salesPrice = salesPriceRef.current.value;
    const purchasePrice = purchasePriceRef.current.value;
    const userId = JSON.parse(localStorage.getItem("user")).userData._id;

    if (
      !name ||
      !productCode ||
      !hsn ||
      !salesPrice ||
      !purchasePrice ||
      !userId
    ) {
      setError(true);
      return; // Exit early if there's an error
    } else {
      setError(false); // Reset error state if all fields are valid
      let result = await fetch("http://localhost:2000/", {
        method: "post",
        body: JSON.stringify({
          name,
          productCode,
          hsn,
          salesPrice,
          purchasePrice,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log(result);
      alert("Item added successfully.");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add Products</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          ref={nameRef}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
          placeholder="Enter Product Name"
        />
        {error && !nameRef.current?.value && (
          <span className="text-red-500 text-sm mb-3 block">
            Enter Valid Name
          </span>
        )}
        <input
          type="text"
          ref={productCodeRef}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
          placeholder="Enter Product Code"
        />
        {error && !productCodeRef.current?.value && (
          <span className="text-red-500 text-sm mb-3 block">
            Enter Valid Code
          </span>
        )}
        <input
          type="text"
          ref={hsnRef}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
          placeholder="Enter Product HSN Number"
        />
        {error && !hsnRef.current?.value && (
          <span className="text-red-500 text-sm mb-3 block">
            Enter Valid HSN Number
          </span>
        )}
        <input
          type="text"
          ref={salesPriceRef}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
          placeholder="Enter Product Sales Price"
        />
        {error && !salesPriceRef.current?.value && (
          <span className="text-red-500 text-sm mb-3 block">
            Enter Valid Sales Price
          </span>
        )}
        <input
          type="text"
          ref={purchasePriceRef}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
          placeholder="Enter Product Purchase Price"
        />
        {error && !purchasePriceRef.current?.value && (
          <span className="text-red-500 text-sm mb-3 block">
            Enter Valid Purchase Price
          </span>
        )}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
