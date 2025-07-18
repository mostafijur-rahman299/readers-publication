import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"
import { locales } from '@/i18n';
import type { Locale } from '@/i18n';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from "@/i18n/routing"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from "@/utils/providers"
import FetchRootData from "@/components/FetchRootData"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Readers Publications",
  description: "Quality books, journals, and educational materials for all ages",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: { locale: Locale }
}>) {

  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="light" style={{ colorScheme: "light" }}>
      <head> 
        <link rel="icon" href="/readers-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <Providers>
                <div className="relative flex min-h-screen flex-col">
                  <FetchRootData />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
              </Providers>
            </NextIntlClientProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
