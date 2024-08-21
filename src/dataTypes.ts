export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
  }


  export interface SignUpTypes {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    celular: string;
  }
  
  export interface Purchase {
    id: number;
    status: string;
    trackingNumber: string | null;
    createdAt: string;
    updatedAt: string;
    products: Product[];
  }
  
  export interface UserProfile {
    addresses: { street: string; city: string; state: string; zipCode: string }[];
    purchases: Purchase[];
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface JwtPayload {
    id:number,
    sub: string;
    email: string;
    role: string;
  }
  
  export function decodeToken<T>(token: string): T {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload) as T;
  }  


