import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from "next-intl"
import useHttp from "@/hooks/useHttp"
import { useState, useEffect } from "react"
import { API_ENDPOINTS } from "@/constants/apiEnds"

const AddressModal = ({ closeAddressModal, newAddress, setNewAddress }: { closeAddressModal: () => void, newAddress: any, setNewAddress: (newAddress: any) => void }) => {
  const t = useTranslations("checkout")
  const locale = useLocale()
  const [stateList, setStateList] = useState<any[]>([])
  const [cityList, setCityList] = useState<any[]>([])
  const [thanaList, setThanaList] = useState<any[]>([])
  const [unionList, setUnionList] = useState<any[]>([])

  const {sendRequests: fetchStateList} = useHttp()
  const {sendRequests: fetchCityList} = useHttp()
  const {sendRequests: fetchThanaList} = useHttp()
  const {sendRequests: fetchUnionList} = useHttp()

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
  }, [newAddress?.state])

  useEffect(() => {
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
  }, [newAddress?.city])

  useEffect(() => {
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
  }, [newAddress?.thana])

  console.log(newAddress)

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
                <form onSubmit={() => {}} className="space-y-4">
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
                            required
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

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-600 text-white flex-1 transition-colors"
                        >
                            {t("add_address")}
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
