import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const response = await api.get("/products");
    const p = response.data.find((item) => item.id === id);
    setProduct(p);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>
  }

  
  return (
    <div></div>
  )
};
