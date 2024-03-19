import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Etsy } from 'src/components/etsy'

export default function ScraperOne() {
  const { t } = useTranslation('translation')
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Etsy/>
    </>
  )
}
