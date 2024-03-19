import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Starter } from 'src/components/starter'

export default function Home() {
  const { t } = useTranslation('translation')
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Starter />
    </>
  )
}
