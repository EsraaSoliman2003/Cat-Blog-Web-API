import { useContext } from "react";
import { BlogContext } from "./BlogContext";

export default function useBlog() {
  return useContext(BlogContext);
}
