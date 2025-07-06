import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from "next-intl"
import useHttp from "@/hooks/useHttp"
import { useState, useEffect } from "react"
import { API_ENDPOINTS } from "@/constants/apiEnds"

const AddressModal = ({ closeAddressModal }: { closeAddressModal: () => void }) => {
  const t = useTranslations("checkout")
  const locale = useLocale()
  const [stateList, setStateList] = useState<any[]>([])
  const [cityList, setCityList] = useState<any[]>([])
  const [thanaList, setThanaList] = useState<any[]>([])
  const [unionList, setUnionList] = useState<any[]>([])
  const [newAddress, setNewAddress] = useState<any>({})
  const {sendRequests: fetchStateList} = useHttp()
  const {sendRequests: fetchCityList} = useHttp()
  const {sendRequests: fetchThanaList} = useHttp()
  const {sendRequests: fetchUnionList} = useHttp()
  const {sendRequests: createUpdateShippingAddress, isLoading: isCreatingUpdatingShippingAddress, error: createUpdateShippingAddressError} = useHttp()

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewAddress((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    fetchStateList({
        url_info: {
            url: API_ENDPOINTS.STATE_LIST,
        }
    }, (data: any) => {
        setStateList(data)
    })
  }, [])

  useEffect(() => {
    if(newAddress?.state) {
        fetchCityList({
            url_info: {
                url: API_ENDPOINTS.CITY_LIST,
            },
            params: {
                state_id: newAddress?.state,
            }
        }, (data: any) => {
            setCityList(data)
        })
    }
  }, [newAddress?.state])

  useEffect(() => {
    if(newAddress?.city) {
        fetchThanaList({
            url_info: {
                url: API_ENDPOINTS.THANA_LIST,
            },
            params: {
                city_id: newAddress?.city,
            }
        }, (data: any) => {
                setThanaList(data)
            })
    }
  }, [newAddress?.city])

  useEffect(() => {
    if(newAddress?.thana) {
        fetchUnionList({
            url_info: {
                url: API_ENDPOINTS.UNION_LIST,
            },
            params: {
                thana_id: newAddress?.thana,
            }
        }, (data: any) => {
                setUnionList(data)
            })
    }
  }, [newAddress?.thana])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUpdateShippingAddress({
        url_info: {
            url: API_ENDPOINTS.SHIPPING_ADDRESS,
            isAuthRequired: true,
        },
        method: "POST",
        data: newAddress,
    }, (data: any) => {
        console.log(data)
        closeAddressModal()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto relative max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={closeAddressModal}
                    aria-label="Close"
                    type="button"
                >
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-semibold text-gray-800 pr-8">{t("add_new_address")}</h3>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {createUpdateShippingAddressError?.non_field_errors && (
                        <div className="bg-red-500 text-white p-3 rounded-md">
                            <p className="text-sm">{createUpdateShippingAddressError?.non_field_errors}</p>
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("address_type") || "Address Type"}</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            {["HOME", "OFFICE", "OTHER"].map((type) => (
                                <label key={type} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50 flex-1 justify-center">
                                    <input 
                                        type="radio" 
                                        name="address_type" 
                                        value={type} 
                                        checked={newAddress.address_type === type} 
                                        onChange={handleNewAddressChange} 
                                        className="sr-only peer" 
                                        required={type === "HOME"}
                                    />
                                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                                    </div>
                                    <span className="text-sm">{t(type.toLowerCase()) || type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t("full_name") || "Full Name"}</label>
                            <Input
                                name="name"
                                value={newAddress.name || ""}
                                onChange={handleNewAddressChange}
                                placeholder={"e.g. John Doe"}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t("phone") || "Phone"}</label>
                            <Input
                                name="phone"
                                value={newAddress.phone || ""}
                                onChange={handleNewAddressChange}
                                placeholder={"e.g. +88017xxxxxxxx"}
                                className="w-full"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("email") || "Email"}</label>
                        <Input
                            name="email"
                            type="email"
                            value={newAddress.email || ""}
                            onChange={handleNewAddressChange}
                            placeholder={"e.g. john.doe@example.com"}
                            className="w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t("state") || "State"}</label>
                            <select
                                name="state"
                                value={newAddress.state || ""}
                                onChange={handleNewAddressChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="">{t("select_state")}</option>
                                {stateList.map((state: any) => (
                                    <option key={state.id} value={state.id}>{locale === "bn" ? state.name_bn : state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t("city") || "City"}</label>
                            <select
                                name="city"
                                value={newAddress.city || ""}
                                onChange={handleNewAddressChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="">{t("select_city")}</option>
                                {cityList.map((city: any) => (
                                    <option key={city.id} value={city.id}>{locale === "bn" ? city.name_bn : city.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t("thana") || "Thana"}</label>
                            <select
                                name="thana"
                                value={newAddress.thana || ""}
                                onChange={handleNewAddressChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="">{t("select_thana")}</option>
                                {thanaList.map((thana: any) => (
                                    <option key={thana.id} value={thana.id}>{locale === "bn" ? thana.name_bn : thana.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t("union")}</label>
                            <select
                                name="union"
                                value={newAddress.union || ""}
                                onChange={handleNewAddressChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="">{t("select_union")}</option>
                                {unionList.map((union: any) => (
                                    <option key={union.id} value={union.id}>{locale === "bn" ? union.name_bn : union.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("address_details") || "Address Details"}</label>
                        <textarea
                            name="detail_address"
                            value={newAddress.detail_address || ""}
                            onChange={handleNewAddressChange}
                            placeholder={t("address_details_placeholder")}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            required
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("note") || "Note"}</label>
                        <textarea
                            name="note"
                            value={newAddress.note || ""}
                            onChange={handleNewAddressChange}
                            placeholder={t("note_placeholder")}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="is_default"
                            checked={newAddress.is_default || false}
                            onChange={handleNewAddressChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm font-medium text-gray-700">{t("is_default") || "Is Default"}</label>
                        
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-600 text-white flex-1 transition-colors"
                            disabled={isCreatingUpdatingShippingAddress}
                        >
                            {isCreatingUpdatingShippingAddress ? t("processing") : t("add_address")}
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={closeAddressModal} 
                            className="flex-1 transition-colors"
                        >
                            {t("cancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddressModal
