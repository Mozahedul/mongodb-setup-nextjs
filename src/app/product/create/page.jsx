"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  // const [showError, setShowError] = useState(false);
  const msgRef = useRef();
  const imgRef = useRef();
  const fileInputRef = useRef();

  // event handler for image
  const handleImage = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Form submit handler
  const submitHandle = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let productData = Object.fromEntries(formData);
    formData.append("upload_preset", "my-uploads");

    // showing error for product title
    if (!productData?.title) {
      msgRef.current.textContent = "Title should not be empty!";
      return true;
    }
    // showing error for product image
    if (!productData?.file?.name) {
      imgRef.current.textContent = "Image should not be empty!";
      return true;
    }

    // Send image to cloudinary
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    console.log("CLOUDINARY ==> ", data);

    console.log("RES ==> ", res);
    console.log("Data ==> ", data);
    // Add image to productData object
    productData.file = data.public_id;

    // Send form data to the backend
    try {
      // res comes from cloudinary
      if (res.statusText === "OK") {
        const response = await fetch("/api/product", {
          method: "POST",
          body: JSON.stringify(productData),
        });

        const resData = await response.json();
        console.log(resData);
        if (resData.msg) {
          toast.error(resData.msg, {
            position: "top-center",
            autoClose: 1000,
          });
        }
        if (resData.success) {
          toast.success(resData.success, {
            position: "top-center",
            autoClose: 1000,
          });
          setTitle("");
          setImage(null);
          fileInputRef.current.value = "";
          router.push("/product/view");
        }
      }
    } catch (error) {
      console.log("Error in product form ==> ", error);
    }
  };

  // Handle upload button
  const handleUploadButton = result => {
    console.log("UPLOAD BUTTON TRIGGERED ");
    console.log(result);
  };

  return (
    <div className="flex items-center flex-col mt-8 ">
      <h2 className="font-bold text-xl block mb-6">Multer and Cloudinary</h2>
      <div className="bg-gray-100 flex flex-col w-96 p-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl block mb-3">Product Create</h3>
          <Link href="/product/view">
            <button className="bg-slate-400 p-2 text-sm font-bold text-white rounded-md">
              View Products
            </button>
          </Link>
        </div>
        <form onSubmit={submitHandle} encType="multipart/form-data">
          <label>Product title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            className="border-2 text-sm outline-none w-full py-1 pl-2"
            placeholder="Insert Product Title"
          />
          {title.length < 1 && (
            <span
              className="text-red-400 text-[12px] font-semibold w-full "
              ref={msgRef}
            ></span>
          )}
          <label className="mt-4 text-sm block mb-1">Product Image:</label>
          <label className="bg-white border-2 block text-sm py-1 pl-2 cursor-pointer text-gray-400">
            <BsImageFill
              style={{
                display: "inline-block",
                fontSize: "18px",
              }}
            />{" "}
            {image ? "Image uploaded" : "Insert an image"}
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          {!image && (
            <span
              className="text-red-400 text-[12px] font-semibold w-full "
              ref={imgRef}
            ></span>
          )}

          {image && (
            <div className="mt-2">
              <Image
                src={image}
                alt={image}
                width={40}
                height={40}
                style={{ borderRadius: "5px" }}
              />
            </div>
          )}

          {/* Cloudinary image upload */}
          <CldUploadButton
            uploadPreset="my-uploads"
            className="block bg-orange-500 text-sm py-2 px-3 mt-4  rounded-md"
            onUpload={handleUploadButton}
          />

          <input
            type="submit"
            value="Add Product"
            className="bg-blue-400 px-2 py-2 rounded-sm mt-4 cursor-pointer text-white text-sm transition duration-500 hover:bg-blue-700"
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
