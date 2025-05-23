"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import {
  CreditCard,
  Wallet,
  Banknote,
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Building2,
  Smartphone,
  ArrowRight
} from "lucide-react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type Address = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postal: string;
};

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [address, setAddress] = useState<Address>({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    postal: "",
  });

  useEffect(() => {
    const mockCart: CartItem[] = [
      { id: 1, title: "Wireless Mouse", price: 15.99, quantity: 2, image: "/products/mouse.jpg" },
      { id: 2, title: "Bluetooth Headphones", price: 39.99, quantity: 1, image: "/products/headphones.jpg" },
      { id: 3, title: "Laptop Stand", price: 24.49, quantity: 1, image: "/products/stand.jpg" },
    ];
    setCart(mockCart);
    localStorage.setItem("cart", JSON.stringify(mockCart));
  }, []);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 5.0;
  const totalAmount = subtotal + shippingCost;

  const handlePaymentSelection = (method: string) => {
    setSelectedPayment(method);
  };

  const handleInputChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = () => {
    const isAddressValid = Object.values(address).every(field => field.trim() !== "");
    if (!isAddressValid) {
      alert("Please fill in all address fields.");
      return;
    }

    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    alert(`Order placed successfully!
    Payment Method: ${selectedPayment}
    Shipping To: ${address.name}, ${address.street}, ${address.city}`);
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-50 p-3 rounded-xl">
                <ShoppingBag className="h-8 w-8 text-brand-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t("title")}</h1>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <Package className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-500 text-lg">{t("empty_cart")}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Order Summary */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-600" />
                      {t("order_summary")}
                    </h2>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                        >
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-brand-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-700">{t("subtotal")}</p>
                      <p className="font-medium">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4 text-brand-600" />
                        <p className="text-gray-700">{t("shipping_cost")}</p>
                      </div>
                      <p className="font-medium">${shippingCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <p className="text-base font-semibold">{t("total")}</p>
                      <p className="text-2xl font-bold text-brand-600">
                        ${totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Address + Payment */}
                <div className="space-y-6">
                  {/* Address Section */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                    <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-brand-600" />
                      Shipping Address
                    </h2>

                    {["name", "phone", "email", "street", "city", "postal"].map(field => (
                      <div key={field}>
                        <Label htmlFor={field} className="capitalize">{field}</Label>
                        <Input
                          id={field}
                          type="text"
                          value={address[field as keyof Address]}
                          onChange={e => handleInputChange(field as keyof Address, e.target.value)}
                          placeholder={`Enter your ${field}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Payment Section */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-brand-600" />
                      {t("payment_method")}
                    </h2>

                    <div className="grid gap-3">
                      {[
                        { method: "bank", label: t("bank"), icon: Building2 },
                        { method: "bkash", label: t("bkash"), icon: Smartphone },
                        { method: "nagad", label: t("nagad"), icon: Smartphone },
                        { method: "cash", label: t("cash_on_delivery"), icon: Banknote }
                      ].map(({ method, label, icon: Icon }) => (
                        <Button
                          key={method}
                          variant={selectedPayment === method ? "default" : "outline"}
                          className="w-full py-4 text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                          onClick={() => handlePaymentSelection(method)}
                        >
                          <Icon className="h-5 w-5" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full py-4 text-base bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    onClick={handleSubmitOrder}
                  >
                    {t("place_order")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
