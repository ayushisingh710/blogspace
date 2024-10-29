"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextArea from "@/components/TextArea";
import demoImage from "@/public/img/demo_image.jpg";
import Image from "next/image";
import { deletePhoto } from "@/actions/uploadActions";

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Technology",
  photo: {},
  blogId: "",
  newImage: "",
};

const EditBlog = ({ params }) => {
  const CLOUD_NAME = "damxp4kbn";
  const UPLOAD_PRESET = "blogspace_images";
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {

    async function fetchBlog() {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${params.id}`);

        if (res.status === 200) {
          const blogData = await res.json();

          setState((prevstate) => ({
            ...prevstate,
            title: blogData.title,
            description: blogData.description,
            excerpt: blogData.excerpt,
            quote: blogData.quote,
            category: blogData.category,
            photo: blogData.image,
            blogId: blogData._id,
          }));
        } else {
          setError("Error fetching blog data");
        }
      } catch (error) {
        setError("Error fetching blog data");
      }
    }

    fetchBlog();
  }, [params.id]);

  if (status === "loading") {
    return <p>loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access denied</p>;
  }

  const handleChange = (event) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newImage, title, category, description, excerpt, quote } = state;

    if (!title || !description || !category || !excerpt || !quote) {
      setError("Please fill out all required fields.");
      return;
    }

    if (newImage) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (newImage.size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    if (title.length < 4) {
      setError("Title must be at least 4 characters long.");
      return;
    }

    if (description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    if (excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long.");
      return;
    }

    if (quote.length < 6) {
      setError("Quote must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      let image;

      if (state.newImage) {
        image = await uploadImage();

        if (state.photo?.id) {
          await deletePhoto(state.photo.id);
        }
      } else {
        image = state.photo;
      }

      const updateBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id,
      };

      const response = await fetch(
        `http://localhost:3000/api/blog/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "PUT",
          body: JSON.stringify(updateBlog),
        }
      );

      console.log("API response:", response);

      if (response?.status === 200) {
        console.log("Blog updated successfully!");
        setSuccess("Blog updated successfully.");

        router.replace(`/blog/${params.id}`, undefined, { shallow: true });
      } else {
        console.log("Error occurred while updating blog.");
        setError("Error occurred while updating blog.");
      }
    } catch (error) {
      console.log("Error occurred while updating blog:", error);
      setError("Error occurred while updating blog.");
    }

    setIsLoading(false);
  };

  const uploadImage = async () => {
    if (!state.newImage) return;

    const formData = new FormData();

    formData.append("file", state.newImage);
    formData.append("upload_preset", "blogspace_images");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/damxp4kbn/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"],
      };

      return image;
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log(error);
    }
  };

  const handleCancelUploadImg = () => {
    setState({ ...state, ["newImage"]: "" });
  };

  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Edit</span> Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Write you title here..."
          onChange={handleChange}
          value={state.title}
        />

        <TextArea
          label="Description"
          rows="4"
          name="description"
          placeholder="Write you description here..."
          onChange={handleChange}
          value={state.description}
        />

        <TextArea
          label="Excerpt"
          rows="2"
          name="excerpt"
          placeholder="Write you excerpt here..."
          onChange={handleChange}
          value={state.excerpt}
        />

        <TextArea
          label="Quote"
          rows="2"
          name="quote"
          placeholder="Write you quote here..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">Select an option</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-accent"
          >
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Art">Art</option>
            <option value="Business">Business</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>

          <input
            onChange={handleChange}
            type="file"
            name="newImage"
            accept="image/*"
          />

          {state.newImage ? (
            <div>
              <Image
                src={URL.createObjectURL(state.newImage)}
                priority
                alt="Sample image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-32 mt-5"
              />

              <button onClick={handleCancelUploadImg}>Cancel</button>
            </div>
          ) : (
            <div>
              {state.photo && state.photo["url"] && (
                <div>
                  <Image
                    src={state.photo.url}
                    priority
                    alt="Sample image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-32 mt-5"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {error && <div className="text-red-700">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

        <button type="submit" className="btn">
          {isLoading ? "Loading..." : "Edit"}
        </button>
      </form>
    </section>
  );
};

export default EditBlog;
