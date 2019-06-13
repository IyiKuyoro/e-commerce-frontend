export default interface IProduct {
  product_id: number;
  name: string;
  description: string;
  price: number;
  discounted_price: number;
  image?: string;
  image_2?: string;
  thumbnail?: string;
}
