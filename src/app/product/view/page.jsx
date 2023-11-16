"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

const Page = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const handleProductDelete = async productId => {
    console.log(productId);
    try {
      const response = await fetch(`/api/product?id=${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        const filteredProducts = products.filter(
          product => product._id !== productId
        );
        setProducts(filteredProducts);
        toast.error(data.success, { position: "top-center", autoClose: 1000 });
      }
      if (data.msg) {
        toast.info(data.msg, { position: "top-center", autoClose: 1000 });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await fetch("/api/product");
        if (response.statusText === "OK") {
          const data = await response.json();
          setProducts(data);
        }
      };
      fetchProducts();
    } catch (err) {
      toast.error(err);
    }
  }, [setProducts]);
  return (
    <div className="flex flex-col w-4/5 m-auto mb-10">
      <div className="flex justify-between py-6">
        <h2 className="font-bold text-3xl">Product view</h2>
        <Link href="/product/create">
          <button className="bg-green-500 p-2 text-sm font-bold text-white rounded-md">
            Create Product
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse border border-slate-400">
        <thead className="bg-gray-200 h-12">
          <tr>
            <th className="border border-slate-300 ...">ID:</th>
            <th className="border border-slate-300 ...">Title:</th>
            <th className="border border-slate-300 ...">Image:</th>
            <th className="border border-slate-300 ...">Action:</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.length > 0 &&
            products?.map(product => (
              <tr
                key={product._id}
                className="cursor-pointer transition duration-500 hover:bg-gray-100"
              >
                <td className="p-2 border border-slate-300 ...">
                  {product._id}
                </td>
                <td className="p-2 border border-slate-300 ...">
                  {product.title}
                </td>
                <td className="p-2 border border-slate-300 ...">
                  {/* <Image
                    src={product.file}
                    alt={product.title}
                    width={40}
                    height={40}
                    priority
                  /> */}
                  <CldImage
                    src={product.file}
                    width="40"
                    height="40"
                    alt={product.title}
                  />
                </td>
                <td className="p-2 border border-slate-300 ...">
                  <button className="transition duration-500 text-green-300 text-2xl hover:text-green-500">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="transition duration-500 ml-2 text-red-400 text-2xl hover:text-red-700"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
