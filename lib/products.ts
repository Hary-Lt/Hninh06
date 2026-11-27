export interface ProductColorVariant {
  color: string;
  colorHex: string;
  urls: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  code: string;
  stock: number;
  image: string;
  images?: ProductColorVariant[];
  isNew: boolean;
  isHot: boolean;
  isSale: boolean;
  description: string;
}


export const products: Product[] = [
  {
    id: 99,
    name: "DSQ2 2081 màu đen was rách kèm sơn mài",
    price: 680000,
    oldPrice: 750000,
    category: "Quan",
    code: "",
    stock: 11,
    image: "https://i.postimg.cc/L6Qxz9FT/l1.jpg",
    images: [
      {
        color: "Tat ca",
        colorHex: "#000000",
        urls: [
          "https://i.postimg.cc/L6Qxz9FT/l1.jpg",
          "https://i.postimg.cc/43kb5nLv/l2.jpg",
          "https://i.postimg.cc/kX2QPWLs/l3.jpg",
          "https://i.postimg.cc/2yVZmfcg/l4.jpg",
        ],
      },
    ],
    isNew: true,
    isHot: true,
    isSale: true,
    description: "DSQ2 2081 màu đen was rách kèm sơn mài  . Màu siêu đẹp k có gì để chê 🤭🤭 . Lên from lên dáng hết nước chấmmm 😋 ❤️",
  },
  
  {
    id: 54,
    name: "Thắt Lưng Hàng NeW vừa cập bến !!",
    price: 245000,
    oldPrice: 330000,
    category: "That lung",
    code: "QJ061",
    stock: 19,
    image: "https://i.postimg.cc/rmqrXTV8/tt1.jpg",
    images: [
      {
        color: "Tat ca",
        colorHex: "#000000",
        urls: [
          "https://i.postimg.cc/rmqrXTV8/tt1.jpg",
          "https://i.postimg.cc/TP6ygxWh/t101.jpg",
          "https://i.postimg.cc/D0H0Z3T7/ttt1.jpg",
        ],
      },
    ],
    isNew: true,
    isHot: true,
    isSale: true,
    description: "Thắt lưng Hãng Nét Căng ✌🏻",
  },
];

export const categories = [
  { id: "all", name: "Tat Ca", icon: "🔥" },
  { id: "Ao", name: "Ao", icon: "👕" },
  { id: "Quan", name: "Quan", icon: "👖" },
  { id: "Do bo", name: "Do Bo", icon: "👔" },
  { id: "Giay", name: "Giay", icon: "👟" },
  { id: "Dep", name: "Dep", icon: "🩴" },
  { id: "That lung", name: "That Lung", icon: "🔗" },
  { id: "Tui", name: "Tui", icon: "👜" },
  { id: "Mu", name: "Mu", icon: "🧢" },
  { id: "Dong ho", name: "Dong Ho", icon: "⌚" },
];

export const ZALO_NUMBER = "0862536206";
export const FACEBOOK_ID = "hoang.ninh.79677471";

export const vietnameseNames = [
  "Minh Anh",
  "Hoang Long",
  "Thu Huong",
  "Duc Minh",
  "Ngoc Anh",
  "Quang Huy",
  "Mai Linh",
  "Tuan Kiet",
  "Phuong Thao",
  "Duy Khang",
  "Thanh Hang",
  "Bao Ngoc",
  "Hoai Nam",
  "Kim Chi",
  "Van Anh",
  "Truong Giang",
  "Thuy Tien",
  "Duc Anh",
  "My Linh",
  "Quoc Viet",
  "Phan Huy",
  "Huy Huong",
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export function getZaloLink(productCode: string, productName: string): string {
  const message = encodeURIComponent(
    `Toi muon mua san pham [${productCode}] - ${productName}`,
  );
  return `https://zalo.me/${ZALO_NUMBER}?text=${message}`;
}

export function getFacebookLink(
  productCode: string,
  productName: string,
): string {
  const message = encodeURIComponent(
    `Toi muon mua san pham [${productCode}] - ${productName}`,
  );
  return `https://m.me/${FACEBOOK_ID}?text=${message}`;
}
