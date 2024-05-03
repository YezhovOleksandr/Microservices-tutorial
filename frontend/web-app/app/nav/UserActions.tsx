'use client'

import { useParamsStore } from '@/hooks/useParamStore'
import { Button, Dropdown, DropdownDivider } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi2'


type Props = {
    user: User
}
export default function UserActionsu({ user }: Props) {
    const router = useRouter();
    const pathName = usePathname();
    const setParams = useParamsStore(state => state.setParams)

    function setWinner() {
        setParams({ winner: user.username, seller: undefined })
        if (pathName !== '/') router.push('/')
    }


    function setSeller() {
        setParams({ seller: user.username, winner: undefined })
        if (pathName !== '/') router.push('/')
    }


    return (
        <Dropdown label={`Welcome ${user.name}`} inline>
            <Dropdown.Item icon={HiUser} onClick={setSeller}>
                My Auctions
            </Dropdown.Item>

            <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
                Auctions won
            </Dropdown.Item>

            <Dropdown.Item icon={AiFillCar}>
                <Link href='/auctions/create'>
                    Sell my car
                </Link>
            </Dropdown.Item>

            <Dropdown.Item icon={HiCog}>
                <Link href='/session'>
                    Session (dev only)
                </Link>
            </Dropdown.Item>
            <DropdownDivider />

            <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({ callbackUrl: '/' })}>Sign out
                <Link href='/'>
                    Log Out
                </Link>
            </Dropdown.Item>
        </Dropdown>
    )
}
