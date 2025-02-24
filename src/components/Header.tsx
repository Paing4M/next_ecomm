'use client'

import Image from "next/image";
import Link from "next/link";
import {MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon} from "lucide-react";
import {useClerk, UserButton, useUser} from "@clerk/nextjs";
import {useState} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {usePathname, useRouter} from "next/navigation";


interface UserInfoUIProps {
  handleSignInModal: () => void
  className?: string
}

const UserInfoUI = ({handleSignInModal, className}: UserInfoUIProps) => {
  const {user} = useUser()

  return (
    <div>
      {!user ? (
        <button onClick={handleSignInModal} className={`border-none outline-none text-md font-bold ${className}`}>
          Sign in
        </button>

      ) : (
        <UserButton>
          <UserButton.MenuItems>
            {/*<UserButton.Action label={''} labelIcon={} onClick={}/>*/}
          </UserButton.MenuItems>

        </UserButton>
      )}

    </div>
  )
}


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const pathname = usePathname()
  const {user} = useUser()
  const {openSignIn, openUserProfile} = useClerk()

  const handleSignInModal = () => {
    openSignIn()
  }


  return (
    <header className='h-[70px] flex items-center border-b border-gray-200'>
      <div className='flex items-center justify-between w-full h-full relative'>
        {/*  logo */}
        <Link href={'/'}>
          <Image src='/images/logo.png' height='100' width='100' alt='logo-ecomm'/>
        </Link>

        {/* menu */}
        <button onClick={() => setMenuOpen(prev => !prev)}
                className='absolute md:hidden top-0 bottom-0 right-0 z-[15] p-2 rounded-full'>
          {menuOpen ? <CloseIcon/> : <MenuIcon/>}
        </button>

        {/* nav */}
        <nav className='hidden md:block'>
          <ul className='flex items-center gap-x-4'>
            <li>
              <Link href='/'
                    className={`block px-2 font-semibold ${pathname == '/' ? 'underline decoration-redBackground decoration-2 ' : ''}`}>Home</Link>
            </li>
            <li>
              <Link href={'/shop'}
                    className={`block px-2 font-semibold ${pathname.includes('shop') ? 'underline decoration-redBackground decoration-2 ' : ''}`}>Shop</Link>
            </li>
            <li>
              <Link href={'/about'}
                    className={`block px-2 font-semibold ${pathname.includes('about') ? 'underline decoration-redBackground decoration-2 ' : ''}`}>About</Link>
            </li>

          </ul>

        </nav>


        <div className='hidden md:flex items-center gap-x-6 pr-2'>
          {/* search */}
          <div
            className='items-center gap-x-1 border border-gray-400 rounded-md overflow-hidden px-2 py-1 flex'>
            <input type="text" placeholder='What are you looking for?'
                   className='border-none outline-none w-full h-full'/>
            <SearchIcon className='text-gray-800'/>
          </div>

          {/* cart */}
          <div className='relative'>
            <Link href={'/cart'}>
              <ShoppingCartIcon className='cursor-pointer'/>
            </Link>

            <span
              className='absolute rounded-full w-full h-full flex items-center justify-center text-sm bg-yellow-300 font-bold top-[-15px] right-[-13px]'>10</span>
          </div>


          {/* user */}
          <UserInfoUI handleSignInModal={handleSignInModal}/>

        </div>
      </div>


      {/* mobile */}

      <div
        className={`z-[10] fixed md:hidden top-0 w-screen sm:w-[50%] overflow-hidden right-0 h-full bg-[#f5f5f5] ${menuOpen ? 'translate-x-0 opacity-1' : 'translate-x-[100%] opacity-0'} transition ease-linear duration-75 `}>
        <nav className='mt-[70px]  w-full h-full'>
          <ul className='flex py-4 items-center flex-col gap-10 w-full h-full'>
            {user && (
              <li>
                <div className='flex items-center select-none gap-2'>
                  {user?.hasImage ? (
                    <Image width={40} height={40} className=' rounded-full' src={user?.imageUrl}
                           alt={user?.firstName + '-profile'}/>
                  ) : (
                    <UserIcon/>
                  )
                  }
                  <h1 className='text-xl font-bold'>
                    {user?.firstName + ' ' + user?.lastName}
                  </h1>

                </div>
              </li>
            )}


            <li>
              <div onClick={() => openUserProfile()}
                   className='text-lg font-bold cursor-pointer underline decoration-2 decoration-redBackground'>Profile
              </div>

            </li>

            <li>
              <Link href='/' onClick={() => setMenuOpen(false)}
                    className={`text-lg font-bold ${pathname == '/' ? 'text-red' : ''}`}>
                Home
              </Link>
            </li>

            <li>
              <Link href={'/shop'} onClick={() => setMenuOpen(false)}
                    className={`text-lg font-bold ${pathname.includes('/shop') ? 'text-red' : ''}`}>
                Shop
              </Link>
            </li>


            <li>
              <Link href={'/about'} onClick={() => setMenuOpen(false)}
                    className={`text-lg font-bold ${pathname.includes('/about') ? 'text-red' : ''}`}>
                About
              </Link>
            </li>

          </ul>
        </nav>
      </div>

    </header>
  )
}

export default Header
