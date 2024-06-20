import { Outlet, Link } from "react-router-dom";
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from "ethers";

const Layout = () => {
    const { open } = useWeb3Modal()
    const { address } = useWeb3ModalAccount()

    return (
        <>
        <button onClick={() => open()} style={{width: "100%"}} className="mt-2">
            <p className="text-sm font-bold">{address? address.substring(0,6) + "...": "<<connect wallet>>"}</p>
        </button>
        <nav className="flex justify-center flex-row mt-10 content-end">
            <ul className="flex flex-row">
            <li className="menu-item">
                <Link to="/">home</Link>
            </li>
            <li className="font-bold text-2xl">
                pompi.xyz
            </li>
            <li className="menu-item">
                <Link to="/create">create</Link>
            </li>
            </ul>
        </nav>

        <Outlet />
        </>
    )
};

export default Layout;
