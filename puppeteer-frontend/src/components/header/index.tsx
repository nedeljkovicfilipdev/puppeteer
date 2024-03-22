import React, { ReactNode, useState } from 'react'
import { LanguageSelector } from '../language-selector'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { Github, LogIn, BookOpen, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'


interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) {
  const { t } = useTranslation()
  
  return (
    <div className="fixed left-0 top-0 flex w-full items-center justify-between border bg-zinc-100 bg-opacity-80 px-4 py-4 md:px-12">
      <Link to="/" className="text-xl font-bold text-slate-600 hover:text-white dark:text-white">
        Web Scrapers
      </Link>
      <div className="flex items-center gap-4">
        <Link to='/cart' className='font-bold text-slate-600'>Cart</Link>
        <LanguageSelector />
      </div>
    </div>
  )
}
