import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 md:ml-[680px] ml-[300px] mt-5">
        All Products
      </h1>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
