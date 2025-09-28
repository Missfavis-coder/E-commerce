export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string;
    discountPercentage: number,
    stock: number,
    availabilityStatus: string,
    quantity: number,
    warrantyInformation: string,
    returnPolicy: string,
    brand: string,
    rating: {
      rate: number;
      count: number;
    };
  };