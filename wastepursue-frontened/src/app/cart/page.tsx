"use client"
import React from 'react'
import Cartpage from '../../components/Cartpage'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const router=useRouter();
  console.log(router, "<<<<<<<<<<<<<<<<slug");
  
  return (
    <div>
      <Cartpage productId={''} />
    </div>
  )
}

export default Cart
