import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className='containerWrap flex justify-between'>
                <a className="btn btn-ghost normal-case text-xl">MY CHAT</a>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar