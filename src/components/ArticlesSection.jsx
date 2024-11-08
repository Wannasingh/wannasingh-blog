/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import authorImage from "../assets/author-image.jpeg";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default function Articles() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when starting to fetch
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://blog-post-project-api.vercel.app/posts?page=${page}&limit=6&category=${category}`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        setIsLoading(false);
        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [page, category]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 mb-20">
      <h2 className="text-xl font-bold mb-4 px-4">Latest articles</h2>
      <div className="bg-[#EFEEEB] px-4 py-4 md:py-3 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row-reverse md:items-center md:space-y-0 md:justify-between mb-10">
        <div className="w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              className="py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </div>
        <div className="md:hidden w-full">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setPosts([]);
              setPage(1);
              setHasMore(true);
            }}
          >
            <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => {
                return (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPosts([]);
                setPage(1);
                setHasMore(true);
              }}
              className={`px-4 py-3 transition-colors rounded-sm text-sm text-muted-foreground font-medium ${
                category === cat ? "bg-[#DAD6D1]" : "hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {posts.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              id={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={new Date(blog.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          );
        })}
      </article>
      {hasMore && (
        <div className="text-center mt-20">
          <button
            onClick={handleLoadMore}
            className={`font-medium ${
              !isLoading ? "underline hover:text-muted-foreground" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex flex-col items-center min-h-lvh">
                <Loader2 className="w-12 h-12 animate-spin text-foreground" />
                <p className="mt-4">Loading...</p>
              </div>
            ) : (
              "View more"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function BlogCard({ id, image, category, title, description, author, date }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => navigate(`/post/${id}`)}
        className="relative h-[212px] sm:h-[360px]"
      >
        <img
          className="w-full h-full object-cover rounded-md"
          src={image}
          alt={title}
        />
      </button>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {category}
          </span>
        </div>
        <button onClick={() => navigate(`/post/${id}`)}>
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
            {title}
          </h2>
        </button>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={authorImage}
            alt={author}
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
