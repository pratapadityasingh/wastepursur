"use client"
import React, { useEffect, useState } from 'react'
import Cartpage from '../../../components/Cartpage'
import { useRouter } from 'next/router'
import { useParams, useSearchParams } from 'next/navigation';


const Cart = () => {
    const { pId }: any = useParams();
    
    console.log(pId, "gd");
    

    useEffect(()=>{

    })

    return (
        <div>
            {pId && <Cartpage productId={pId}  />}
            
        </div>
    )
}

export default Cart
