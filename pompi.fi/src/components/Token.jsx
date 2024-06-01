import React from 'react'
import { Link } from 'react-router-dom';

const Token = ({logoUrl, name, ticker, description, address}) => {
  return (
    <Link to={`/exchange/${address}`}>
        <div className='m-1 p-2 border border-purple-400 grid grid-rows-1 grid-cols-2 gap-1'>
            <img src={logoUrl} alt="Logo"/>
            <div>
                <p>
                    {name}
                </p>
                <p>
                    {ticker}
                </p>
                <p>
                    {description}
                </p>
            </div>
        </div>
    </Link>
  )
}

export default Token;