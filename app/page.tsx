import Image from 'next/image'
import { Inter } from 'next/font/google'
import HeroImg from './components/Hero'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <HeroImg />
    </div>
  )
}
