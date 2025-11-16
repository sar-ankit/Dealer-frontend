import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DealerPage from './dealerPage';
import VehiclePage from './vehiclePage';
import PaymentPage from './paymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dealers" element={<DealerPage />} />
        <Route path="/vehicles" element={<VehiclePage />} />
        <Route path="/payments" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}