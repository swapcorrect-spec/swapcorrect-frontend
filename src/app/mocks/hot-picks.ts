import { IProduct } from "@/interface/IProduct";
import ProductOne from "@/app/assets/images/pngs/product_1.jpg";
import ProductTwo from "@/app/assets/images/pngs/product_2.jpg";
import ProductThree from "@/app/assets/images/pngs/product_3.jpg";
import ProductFour from "@/app/assets/images/pngs/product_4.jpg";
import ProductFive from "@/app/assets/images/pngs/product_5.jpg";
import ProductSix from "@/app/assets/images/pngs/product_6.jpg";

export const HOT_PICKS: IProduct[] = [
  {
    listingId: 1,
    listType: "Basic",
    itemName: 'Gently used Nike shoe',
    estimatedCurrency: 'NGN',
    estimatedAmount: 75000,
    itemDescription: 'High quality Nike sneakers in excellent condition',
    isFavItem: false,
    reviewStage: 'Approved',
    categoryName: 'Fashion',
    fullName: 'Jenny Franklin',
    email: 'jenny@example.com',
    phoneNumber: '08123456789',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
    username: 'Jenny Franklin',
    media: [
      {
        mediaType: 'Image',
        url: ProductOne
      }
    ],
    swapListRequest: ['Airpods', 'Power Bank'],
    itemCondition: 'Fairly used',
    // Legacy fields for backward compatibility
    id: 1,
    author: 'Jenny Franklin',
    image: ProductOne,
    name: 'Gently used Nike shoe',
    photo: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
    price: '₦75,000.00',
    rating: 3.5,
    wants: ['Airpods', 'Power Bank']
  },
  {
    listingId: 2,
    listType: "Basic",
    itemName: 'Gently used Nike shoe',
    estimatedCurrency: 'NGN',
    estimatedAmount: 75000,
    itemDescription: 'High quality Nike sneakers in excellent condition',
    isFavItem: false,
    reviewStage: 'Approved',
    categoryName: 'Fashion',
    fullName: 'Jenny Franklin',
    email: 'jenny@example.com',
    phoneNumber: '08123456789',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
    username: 'Jenny Franklin',
    media: [
      {
        mediaType: 'Image',
        url: ProductTwo
      }
    ],
    swapListRequest: ['Smart Watch', 'Power Bank'],
    itemCondition: 'Fairly used',
    // Legacy fields for backward compatibility
    id: 2,
    author: 'Jenny Franklin',
    image: ProductTwo,
    name: 'Gently used Nike shoe',
    photo: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
    price: '₦75,000.00',
    rating: 3.5,
    wants: ['Smart Watch', 'Power Bank']
  },
  {
    listingId: 3,
    listType: "Basic",
    itemName: 'Gently used Nike shoe',
    estimatedCurrency: 'NGN',
    estimatedAmount: 75000,
    itemDescription: 'High quality Nike sneakers in excellent condition',
    isFavItem: false,
    reviewStage: 'Approved',
    categoryName: 'Fashion',
    fullName: 'Jenny Franklin',
    email: 'jenny@example.com',
    phoneNumber: '08123456789',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
    username: 'Jenny Franklin',
    media: [
      {
        mediaType: 'Image',
        url: ProductThree
      }
    ],
    swapListRequest: ['Airpods', 'Power Bank'],
    itemCondition: 'Fairly used',
    // Legacy fields for backward compatibility
    id: 3,
    author: 'Jenny Franklin',
    image: ProductThree,
    name: 'Gently used Nike shoe',
    photo: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
    price: '₦75,000.00',
    rating: 3.5,
    wants: ['Airpods', 'Power Bank']
  },
  {
    listingId: 4,
    listType: "Basic",
    itemName: 'Gently used Nike shoe',
    estimatedCurrency: 'NGN',
    estimatedAmount: 75000,
    itemDescription: 'High quality Nike sneakers in excellent condition',
    isFavItem: false,
    reviewStage: 'Approved',
    categoryName: 'Fashion',
    fullName: 'Jenny Franklin',
    email: 'jenny@example.com',
    phoneNumber: '08123456789',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/4.jpg',
    username: 'Jenny Franklin',
    media: [
      {
        mediaType: 'Image',
        url: ProductFour
      }
    ],
    swapListRequest: ['Airpods', 'Power Bank'],
    itemCondition: 'Fairly used',
    // Legacy fields for backward compatibility
    id: 4,
    author: 'Jenny Franklin',
    image: ProductFour,
    name: 'Gently used Nike shoe',
    photo: 'https://randomuser.me/api/portraits/thumb/women/4.jpg',
    price: '₦75,000.00',
    rating: 3.5,
    wants: ['Airpods', 'Power Bank']
  },
  {
    listingId: 5,
    listType: "Basic",
    itemName: 'Gently used Nike shoe',
    estimatedCurrency: 'NGN',
    estimatedAmount: 75000,
    itemDescription: 'High quality Nike sneakers in excellent condition',
    isFavItem: false,
    reviewStage: 'Approved',
    categoryName: 'Fashion',
    fullName: 'Jenny Franklin',
    email: 'jenny@example.com',
    phoneNumber: '08123456789',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
    username: 'Jenny Franklin',
    media: [
      {
        mediaType: 'Image',
        url: ProductFive
      }
    ],
    swapListRequest: ['Airpods', 'Power Bank'],
    itemCondition: 'Fairly used',
    // Legacy fields for backward compatibility
    id: 5,
    author: 'Jenny Franklin',
    image: ProductFive,
    name: 'Gently used Nike shoe',
    photo: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
    price: '₦75,000.00',
    rating: 3.5,
    wants: ['Airpods', 'Power Bank']
  },
  {
    listingId: 6,
    listType: "Basic",
    itemName: 'Gently used Nike shoe',
    estimatedCurrency: 'NGN',
    estimatedAmount: 75000,
    itemDescription: 'High quality Nike sneakers in excellent condition',
    isFavItem: false,
    reviewStage: 'Approved',
    categoryName: 'Fashion',
    fullName: 'Jenny Franklin',
    email: 'jenny@example.com',
    phoneNumber: '08123456789',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/6.jpg',
    username: 'Jenny Franklin',
    media: [
      {
        mediaType: 'Image',
        url: ProductSix
      }
    ],
    swapListRequest: ['Airpods', 'Power Bank'],
    itemCondition: 'Fairly used',
    // Legacy fields for backward compatibility
    id: 6,
    author: 'Jenny Franklin',
    image: ProductSix,
    name: 'Gently used Nike shoe',
    photo: 'https://randomuser.me/api/portraits/thumb/women/6.jpg',
    price: '₦75,000.00',
    rating: 3.5,
    wants: ['Airpods', 'Power Bank']
  },
]