export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    inStock: boolean;
    featured: boolean;
    whatsappMessage: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface AdminCredentials {
    username: string;
    password: string;
}
