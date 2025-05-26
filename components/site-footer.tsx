import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <div className="relative h-12 w-32">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
            </Link>
            <p className="mb-4 text-sm text-gray-600">
              {t('about')}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{t('address')}</p>
              <p>{t('phone')}</p>
              <p>{t('email')}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('social')}</h3>
            <p className="mb-4 text-sm text-gray-600">{t('followUs')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Image src="/icons/twitter.png" alt="Twitter" width={24} height={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Image src="/icons/linkedin.png" alt="LinkedIn" width={24} height={24} />
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('paymentMethods')}</h3>
            <div className="flex flex-wrap gap-2">
              <Image src="/icons/visa.png" alt="Visa" width={48} height={32} />
              <Image src="/icons/mastercard.png" alt="Mastercard" width={48} height={32} />
              <Image src="/icons/bkash.png" alt="bKash" width={48} height={32} />
              <Image src="/icons/nagad.png" alt="Nagad" width={48} height={32} />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Readers Publications. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
