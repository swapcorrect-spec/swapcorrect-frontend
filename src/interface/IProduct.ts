import { StaticImport } from "next/dist/shared/lib/get-img-props";


export interface IProduct {
  id: number;
  wants: string[];
  price: string;
  rating: number;
  photo: string;
  image: string | StaticImport;
  name: string;
  author: string;
}