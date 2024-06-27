import React from 'react'
import { Link } from 'react-router-dom';

const Token = ({logoUrl, name, ticker, description, address}) => {
  return (
    <Link to={`/exchange/${address}`}>
        <div className="col-span-3 bg-[#613980]/[.09] rounded-xl p-4 border border-[#bd93f932] h-min">
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