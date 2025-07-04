"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations, useLocale } from "next-intl"
import { Banknote, Smartphone, RotateCcw, Coins, Info, Edit, Trash2, Plus, X } from "lucide-react"
import Image from "next/image"

type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
  image?: string
}

type Address = {
  id: string
  label: string
  type: string
  name: string
  phone: string
  address: string
}

export default function CheckoutPage() {
  const t = useTranslations("checkout")
  const locale = useLocale()
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [promoCode, setPromoCode] = useState<string>("")
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const [selectedAddress, setSelectedAddress] = useState<string>("home")

  // Modal state
  const [showAddressModal, setShowAddressModal] = useState(false)

  // Address form state
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    label: "",
    type: "",
    name: "",
    phone: "",
    address: "",
  })

  // Addresses state (make it mutable)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "home",
      label: "পারিবারিক সদর",
      type: "HOME",
      name: "Md Mostafijur Rahman",
      phone: "01404334031",
      address: "Infront of SKS hospital, masterpara পারিবারিক পোস্ট অফিস, পারিবারিক সদর, পারিবারিক, বাংলাদেশ।",
    },
  ])

  useEffect(() => {
    const mockCart: CartItem[] = [
      { id: 1, title: "Wireless Mouse", price: 15.99, quantity: 2 },
      { id: 2, title: "Bluetooth Headphones", price: 39.99, quantity: 1 },
      { id: 3, title: "Laptop Stand", price: 24.49, quantity: 1 },
    ]
    setCart(mockCart)
  }, [])

  const subtotal = 984
  const onlineFee = 53
  const totalAmount = 1037
  const savings = 166

  const handlePaymentSelection = (method: string) => {
    setSelectedPayment(method)
  }

  const handleSubmitOrder = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.")
      return
    }
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.")
      return
    }
    alert(`Order placed successfully! Payment Method: ${selectedPayment}`)
  }

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" applied!`)
    }
  }

  // Modal handlers
  const openAddressModal = () => {
    setShowAddressModal(true)
    setNewAddress({
      label: "",
      type: "",
      name: "",
      phone: "",
      address: "",
    })
  }
  const closeAddressModal = () => {
    setShowAddressModal(false)
    setNewAddress({
      label: "",
      type: "",
      name: "",
      phone: "",
      address: "",
    })
  }

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (
      !newAddress.label ||
      !newAddress.type ||
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.address
    ) {
      alert("Please fill in all fields.")
      return
    }
    const id = `${newAddress.label?.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`
    const addressObj: Address = {
      id,
      label: newAddress.label!,
      type: newAddress.type!,
      name: newAddress.name!,
      phone: newAddress.phone!,
      address: newAddress.address!,
    }
    setAddresses((prev) => [...prev, addressObj])
    setSelectedAddress(id)
    closeAddressModal()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Address Add Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-2 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={closeAddressModal}
              aria-label="Close"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{t("add_new_address")}</h3>
            <form onSubmit={handleAddAddress} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("address_label") || "Label"}</label>
                <Input
                  name="label"
                  value={newAddress.label || ""}
                  onChange={handleNewAddressChange}
                  placeholder="e.g. Home, Office"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("address_type") || "Type"}</label>
                <Input
                  name="type"
                  value={newAddress.type || ""}
                  onChange={handleNewAddressChange}
                  placeholder="e.g. HOME, OFFICE"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("name") || "Name"}</label>
                <Input
                  name="name"
                  value={newAddress.name || ""}
                  onChange={handleNewAddressChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone") || "Phone"}</label>
                <Input
                  name="phone"
                  value={newAddress.phone || ""}
                  onChange={handleNewAddressChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("address") || "Address"}</label>
                <textarea
                  name="address"
                  value={newAddress.address || ""}
                  onChange={handleNewAddressChange}
                  placeholder="Full Address"
                  className="w-full border rounded px-3 py-2 text-sm"
                  required
                  rows={3}
                />
              </div>
              <div className="pt-2 flex gap-2">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
                  {t("add_address") || "Add Address"}
                </Button>
                <Button type="button" variant="outline" onClick={closeAddressModal} className="flex-1">
                  {t("cancel") || "Cancel"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
            {/* Left: Payment Methods */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Shipping Address Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 text-gray-800">{t("shipping_address")}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">({t("please_select_shipping_address")})</p>

                <div className="space-y-3 sm:space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-colors ${
                        selectedAddress === address.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 mt-1 flex-shrink-0 ${
                              selectedAddress === address.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                            }`}
                          >
                            {selectedAddress === address.id && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                              <span className="font-medium text-gray-800">{address.label}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">({address.type})</span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-700 space-y-0.5 sm:space-y-1">
                              <p>
                                <strong>Name:</strong> {address.name}
                              </p>
                              <p>
                                <strong>Phone:</strong> {address.phone}
                              </p>
                              <p>{address.address}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 ml-0 sm:ml-4 mt-2 sm:mt-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            <span className="hidden xs:inline">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="hidden xs:inline">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full py-2 sm:py-3 text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center justify-center gap-2 bg-transparent text-sm sm:text-base"
                    onClick={openAddressModal}
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t("add_new_address")}</span>
                  </Button>
                </div>
              </div>

              {/* Top Promotional Banners */}
              <div className="grid grid-cols-1 mb-4 sm:mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                  <div className="bg-orange-100 p-1.5 sm:p-2 rounded-lg">
                    <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">7 Days Happy Return</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 text-gray-800">{t("payment_method")}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">({t("please_select_payment_method")})</p>

                <div className="space-y-4 sm:space-y-6">
                  {/* Cash on Delivery */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{t("cash_on_delivery")}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{t("pay_after_receive_product")}</p>

                    <div
                      className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-colors ${
                        selectedPayment === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                      onClick={() => handlePaymentSelection("cod")}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === "cod" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {selectedPayment === "cod" && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded flex items-center justify-center">
                            <Banknote className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="font-medium text-sm sm:text-base">{t("cash_on_delivery")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Banking */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{t("mobile_wallet")}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{t("pay_with_mobile_wallet")}</p>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { id: "bkash", name: "bKash", color: "bg-pink-500", image: "/payment/bkash.webp" },
                        { id: "nagad", name: "Nagad", color: "bg-orange-500", image: "/payment/nagad.webp" },
                        { id: "rocket", name: "Rocket", color: "bg-purple-500", image: "/payment/rocket.webp" },
                      ].map((wallet) => (
                        <div
                          key={wallet.id}
                          className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-colors ${
                            selectedPayment === wallet.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                          }`}
                          onClick={() => handlePaymentSelection(wallet.id)}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                selectedPayment === wallet.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                              }`}
                            >
                              {selectedPayment === wallet.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <Image src={wallet.image} alt={wallet.name} width={100} height={10}/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credit/Debit Cards */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{t("card")}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{t("pay_with_card")}</p>

                    <div
                      className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-colors ${
                        selectedPayment === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                      onClick={() => handlePaymentSelection("card")}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === "card" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {selectedPayment === "card" && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">  
                          <Image src="/payment/rok-ssl-card-icon-sslNew.webp" alt="VISA" width={220} height={10}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-1 sm:gap-2 pt-3 sm:pt-4">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {t("policy_agree")}
                      <a href="#" className="text-blue-600 hover:underline">
                       {" "} {t("terms_and_conditions")}
                      </a>
                    </label>
                  </div>

                  {/* Order Button */}
                  <Button
                    className="w-full py-3 sm:py-4 text-base sm:text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    onClick={handleSubmitOrder}
                    disabled={!selectedPayment || !termsAccepted}
                  >
                    {t("confirm_order")} ৳{totalAmount.toLocaleString()}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Checkout Summary */}
            <div className="lg:col-span-1 mb-6 lg:mb-0">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-4 z-10 lg:static">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">{t("checkout_summary")}</h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">{t("subtotal")}</span>
                    <span className="font-medium text-sm sm:text-base">{subtotal} TK.</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                          <span className="text-gray-600 text-sm sm:text-base">{t("online_fee")}</span>
                      <span className="text-xs text-gray-500">({t("changeable")})</span>
                      <Info className="h-3 w-3 text-gray-400" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{onlineFee} TK.</span>
                  </div>

                  <div className="flex justify-between border-t pt-3 sm:pt-4">
                    <span className="text-gray-600 text-sm sm:text-base">{t("total")}</span>
                    <span className="font-medium text-sm sm:text-base">{totalAmount} TK.</span>
                  </div>

                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>{t("payable_total")}</span>
                    <span>{totalAmount} TK.</span>
                  </div>
                </div>

                {/* Promo Code Section */}
                {/* <div className="mb-4 sm:mb-6">
                  <h3 className="font-medium mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base">Apply Voucher or Promo Code</h3>
                  <div className="flex flex-col xs:flex-row gap-2">
                    <Input
                      placeholder="Enter your code here"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 text-sm"
                    />
                    <Button onClick={applyPromoCode} className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 text-sm sm:text-base">
                      Apply
                    </Button>
                  </div>
                </div> */}

                {/* Savings */}
                <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-600 font-medium text-sm sm:text-base">{t("you_are_saving")} {savings} TK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
