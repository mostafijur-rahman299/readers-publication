import { Mail, User } from 'lucide-react'
import { Phone } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const Settings = () => {
    const t = useTranslations("profile.settings")
    const [isEditing, setIsEditing] = useState(false)
    const userInfo = {
        full_name: "John Doe",
        email: "john.doe@example.com",
        phone_number: "+8801712345678",
        address: "123/A, Green Road, Dhaka-1215"
    }
    return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">{t("title")}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">{t("personal_info")}</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("name")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <User className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userInfo?.full_name}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("email")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Mail className="h-5 w-5" />
                          </div>
                          <input
                            type="email"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userInfo?.email}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("phone_number")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Phone className="h-5 w-5" />
                          </div>
                          <input
                            type="tel"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userInfo?.phone_number}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("address")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userInfo?.address}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-6 flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            {t("cancel")}
                        </Button>
                        <Button className="bg-brand-600 hover:bg-brand-700" onClick={() => setIsEditing(false)}>
                            {t("save")}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium">{t("password_change")}</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("current_password")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type="password"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("new_password")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type="password"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t("confirm_new_password")}</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type="password"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button className="bg-brand-600 hover:bg-brand-700">{t("update")}</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium text-red-600">{t("delete_account")}</h3>
                    <p className="mb-4 text-gray-600">
                        {t("delete_account_message")}
                    </p>
                    <Button variant="destructive">{t("delete_your_account")}</Button>
                  </div>
                </div>
              </div>
  )
}

export default Settings