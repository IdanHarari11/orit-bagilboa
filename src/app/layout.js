import dynamic from 'next/dynamic';
import { Rubik } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/ui/SkipLink';
import Script from 'next/script';
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/analytics/GoogleTagManager';

const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), { ssr: false });
const NagishLi = dynamic(() => import('@/components/ui/NagishLi'), { ssr: false });

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '700'],
  variable: '--font-rubik',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  title: 'וילה אורית בגלבוע | נופש יוקרתי עם בריכה פרטית ונוף מרהיב',
  description: 'וילה אורית בגלבוע מציעה אירוח יוקרתי עם 2 יחידות פרטיות, בריכות, נוף פנורמי והמון פרטיות. הזמינו עכשיו חופשה מושלמת בצפון בסביבה טבעית קסומה!',
  keywords: 'וילה אורית בגלבוע, וילה פרטית בצפון, נופש עם בריכה פרטית, וילה עם בריכה על הגג, חופשה משפחתית בגלבוע, צימר יוקרתי בגלבוע, נופש בטבע, וילה עם נוף, אירוח בוטיק בצפון, וילה לאירוח קבוצות',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          var nl_lang = 'he';
          var nl_pos = 'br';
          var nl_color = 'green';
          var nl_compact = '0';
          var nl_contact = '0543199489';
        `}} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#4A7C59" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="וילה אורית בגלבוע | נופש יוקרתי עם בריכה פרטית ונוף מרהיב" />
        <meta property="og:description" content="וילה אורית בגלבוע מציעה אירוח יוקרתי עם 2 יחידות פרטיות, בריכות, נוף פנורמי והמון פרטיות. הזמינו עכשיו חופשה מושלמת בצפון!" />
        <meta property="og:image" content="https://villaorit.co.il/images/villa-orit-gilboa-panoramic-view.jpg" />
        <meta property="og:url" content="https://villaorit.co.il" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:site_name" content="וילה אורית בגלבוע" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="וילה אורית בגלבוע | נופש יוקרתי עם בריכה פרטית" />
        <meta name="twitter:description" content="וילה אורית בגלבוע מציעה אירוח יוקרתי עם 2 יחידות פרטיות, בריכות, נוף פנורמי והמון פרטיות." />
        <meta name="twitter:image" content="https://villaorit.co.il/images/villa-orit-gilboa-panoramic-view.jpg" />
        <meta name="twitter:site" content="@villaorit" />
        <meta name="twitter:creator" content="@villaorit" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4a7c59" />
        <meta name="msapplication-TileColor" content="#4a7c59" />
        <meta name="theme-color" content="#4a7c59" />
      </head>
      <body className={`${rubik.variable} font-rubik bg-white text-slate-800`}>
        <SkipLink />
        <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <Navbar />
        {children}
        <ScrollToTop />
        <NagishLi />
        <Footer />

        <Script
          id="schema-lodging"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              name: 'וילה אורית בגלבוע',
              image: 'https://villaorit.co.il/images/villa-orit-gilboa-panoramic-view.jpg',
              description: 'וילה אורית בגלבוע מציעה אירוח יוקרתי עם 2 יחידות פרטיות, בריכות, נוף פנורמי והמון פרטיות.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'הגלבוע',
                addressRegion: 'צפון',
                addressCountry: 'IL',
              },
              telephone: '+972543199489',
              priceRange: '₪₪₪',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '87',
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'בריכה פרטית על הגג', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'בריכה חיצונית', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'נוף פנורמי', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'מטבח מאובזר', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'חדרי שינה מרווחים', value: true },
              ],
            }),
          }}
        />

        <Script
          id="schema-faq"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'כמה אנשים יכולים להתארח בוילה אורית בגלבוע?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'הוילה כוללת שתי יחידות אירוח, כל אחת מתאימה לעד 6 אנשים, כך שבסך הכל ניתן לארח עד 12 אנשים.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'האם ניתן להביא חיות מחמד לוילה?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'לצערנו לא ניתן להביא חיות מחמד לוילה אורית בגלבוע.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'האם יש מזגן בכל החדרים?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'כן, כל החדרים בוילה ממוזגים ונעימים בכל עונות השנה.',
                  },
                },
              ],
            }),
          }}
        />

        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      </body>
    </html>
  );
}
