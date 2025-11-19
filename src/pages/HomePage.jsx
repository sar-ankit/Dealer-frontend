import React from 'react'
import logo from '../photo/WhatsApp Image 2025-11-19 at 16.36.56_e012a64b.jpg'
import logoo from '../photo/WhatsApp Image 2025-11-19 at 17.21.32_a3eb7954.jpg'
import logooo from '../photo/WhatsApp Image 2025-11-19 at 17.53.40_d93215e9.jpg'

const HomePage = () => {
   return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to Car Dealership</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Manage Dealers, Vehicles, and Payments easily with a clean and modern dashboard.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <a href="/page-one" className="p-6 bg-white shadow rounded-lg hover:shadow-xl transition ">
          <h3 className="font-semibold mb-2">About Dealer</h3>
          <img src={logo} alt="Page One" className="w-full h-[288px] object-cover"/>
          <p className="text-gray-500">Click to Known about the dealership</p>
        </a>

        <a href="/page-two" className="p-6 bg-white shadow rounded-lg hover:shadow-xl transition">
          <h3 className="font-semibold mb-2">About Vehicle</h3>
          <img src={logoo} alt="Page Two" className="w-full h-[288px] object-cover"/>
          <p className="text-gray-500">Click to Known about the Car and Brand</p>
        </a>

        <a href="/page-three" className="p-6 bg-white shadow rounded-lg hover:shadow-xl transition">

          <h3 className="font-semibold mb-2">About Payment</h3>
            <img src={logooo} alt="Page Three" className="w-full h-[288px] object-cover"/>
          <p className="text-gray-500">Click to Known about the Payment Procedure </p>
        </a>
      </div>
    </div>
  );
}

export default HomePage
