import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DealerPage from './pages/dealerPage';
import VehiclePage from './pages/vehiclePage';
import PaymentPage from './pages/paymentPage';
import HomePage from './pages/HomePage';
import logo from'./photo/32378266_7941369.svg'



function App() {
  return (
    <Router>
      <nav>

      

         <div className="flex gap-6 text-sm font-medium px-6 py-4 bg-black text-white items-center justify-center">

                <div className="flex items-center justify-start gap-1 mr-10">
          <img className="flex items-center justify-center w-10 h-10"
            src={logo}
            alt=""
           
          />
          <span className="text-xl font-semibold">
            Dealer Management
          </span>
        </div >
        <Link className="hover:text-gray-300" to="/">Home</Link> | <Link to="/dealers">Dealers</Link> | <Link to="/vehicles">Vehicles</Link> | <Link to="/payments">Payments</Link> 
        </div>
      </nav>

      




      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dealers" element={<DealerPage />} />
        <Route path="/vehicles" element={<VehiclePage />} />
        <Route path="/payments" element={<PaymentPage />} />
      </Routes>






      <footer className="bg-[#1f1f1f] text-gray-300 py-12 px-6 md:px-20">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

        {/* ABOUT */}
        <div>
          <h4 className="text-white mb-3 font-semibold">ABOUT</h4>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        {/* GROUP COMPANIES */}
        <div>
          <h4 className="text-white mb-3 font-semibold">GROUP COMPANIES</h4>
          <ul className="space-y-2 text-sm">
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>Shopsy</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h4 className="text-white mb-3 font-semibold">HELP</h4>
          <ul className="space-y-2 text-sm">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* CONSUMER POLICY */}
        <div>
          <h4 className="text-white mb-3 font-semibold">CONSUMER POLICY</h4>
          <ul className="space-y-2 text-sm">
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
            <li>FSSAI Food Safety</li>
            <li>Connect App</li>
          </ul>
        </div>

        {/* MAIL US */}
        <div className="md:border-l border-gray-600 pl-6">
          <h4 className="text-white mb-3 font-semibold">Mail Us:</h4>
          <p className="text-sm leading-relaxed">
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>

          <h4 className="text-white mt-5 mb-2 font-semibold">Social:</h4>
          <div className="flex gap-4 text-xl">
            <span>🌐</span>
            <span>✖️</span>
            <span>▶️</span>
            <span>📸</span>
          </div>
        </div>
      </div>

      {/* OFFICE ADDRESS */}
      {/* <div className="mt-10 border-t border-gray-700 pt-6 text-sm">
        <h4 className="text-white mb-2 font-semibold">Registered Office Address:</h4>
        <p>
          Flipkart Internet Private Limited,<br />
          Buildings Alyssa, Begonia &<br />
          Clove Embassy Tech Village,<br />
          Outer Ring Road, Devarabeesanahalli Village,<br />
          Bengaluru, 560103,<br />
          Karnataka, India<br />
          CIN : U51109KA2012PTC066107<br />
          Telephone: <span className="text-blue-400">044-45614700 / 044-67415800</span>
        </p>
      </div> */}
    </footer>
    </Router>
  );
}

export default App;