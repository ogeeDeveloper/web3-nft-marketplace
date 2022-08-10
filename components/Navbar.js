import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { FaSun, FaMoon } from 'react-icons/fa'

import images from '../assets'
import Button from './Button'

// Helper component for our Navbar Component
const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (index) => {
    switch (index) {
      case 0: return '/'
      case 1: return '/created-nfts'
      case 2: return '/my-nfts'
      default:
        break
    }
  }

  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, index) => (
        <li key={index} onClick={() => { setActive(item) }} className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${active === item ? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-3 text-nft-gray-2'}`}>
          <Link href={generateLink(index)}>{item}</Link>
        </li>
      ))}
    </ul>
  )
}

const ButtonGroup = ({ handleCreate, hadleConnectWallet }) => {
  const hasConnected = false

  return hasConnected ? (
    <Button btnName="Create" classStyles="mx-2 rounded-xl" handleClick={handleCreate} />
  ) : <Button btnName="Connect" classStyles="mx-2 rounded-xl" handleClick={hadleConnectWallet} />
}

const Navbar = () => {
  // Give us access to weather we are in the dark or light theme
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [active, setActive] = useState('Explore NFTs')
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  console.log({ theme })

  const handleCreate = () => {
    setActive('')
    router.push('/create-nft')
    console.log('Button clicked')
  }

  const hadleConnectWallet = () => {
    console.log('Connect wallet')
  }

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify start">
        <Link href="/">
          {/* Application Logo */}
          <div className="flexCenter md:hidden cursor-pointer" onClick={() => {}}>
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="Navbar logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">CyptoPet</p>
          </div>
        </Link>

        {/* Logo for medium devices and lower */}
        <Link href="/">
          <div className="hidden md:flex md" onClick={() => {}}>
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="Navbar logo" />
          </div>
        </Link>
      </div>

      {/* Theme Toggle */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" id="checkbox" onChange={handleChangeTheme} />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 rounded-2xl p-1 relative label bg-nft-black-1">
            <i><FaSun className="text-yellow-500 text-xs" /></i>
            <i><FaMoon className="text-pink-300 text-xs" /></i>
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        {/* Navbar Links */}
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <ButtonGroup handleCreate={handleCreate} hadleConnectWallet={hadleConnectWallet} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit="contain"
            width={20}
            height={20}
            alt="Cross icon"
            onClick={() => setIsOpen(false)}
            className={theme === 'light' && 'filter invert'}
          />
        ) : (
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="Menu icon"
            onClick={() => setIsOpen(true)}
            className={theme === 'light' && 'filter invert'}
          />
        )}

        {/* Show menu only if isOpen is set to true  */}
        {isOpen && (
          <div className="flex flex-col fixed z-10 inset-0 top-65 dark:bg-nft-dark bg-white nav-h justify-between">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup handleCreate={handleCreate} hadleConnectWallet={hadleConnectWallet} />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
