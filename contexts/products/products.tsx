//import { Product } from "@/src/models";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";


type Product = {
  title: string;
  description: string;
  image: string;
  images: string[];
  options: string[];
  avgRating: number | string;
  ratings: number | string;
  price: number | string;
  oldPrice: number | string;
};

type ProductsContext = {
  products: Product[];
  addProduct: (props: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Product) => void
}

const ProductsContext = createContext<ProductsContext | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const { getItem, setItem } = useAsyncStorage("PRODUCTS");
  
  // Load products from storage
  useEffect(() => {
    let isMounted = true;
    getItem().then((json) => {
      if (!isMounted) return;

      if (json) {
        const loadedProducts = JSON.parse(json);
        setProducts(loadedProducts ?? []);
      } else {
        setProducts([]);
      }
    });

    return () => {
      isMounted = false;
    }
  }, []);

  // Persist products to storage
  useEffect(() => {
    if (!products) return;
    setItem(JSON.stringify(products));
  }, [products]);

  const addProduct = (props: {
    title: string;
    description: string;
    image: string;
    images: string[];
    options: string[];
    avgRating: number | string;
    ratings: number | string;
    price: number | string;
    oldPrice: number | string;
  }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const { title, description, image, images, options, avgRating, ratings, price, oldPrice } = props;
    const product = {
      id,
      title,
      description,
      image,
      images,
      options,
      avgRating,
      ratings,
      price,
      oldPrice
    };
    setProducts((products) => [...products, product]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts((products) => {
      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );
      return updatedProducts;
    });
  }

  const deleteProduct = (id: string) => {
    setProducts((products) => products.filter((product) => product.id !== id))
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context;
}