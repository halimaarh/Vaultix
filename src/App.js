import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Dashboard from "./Pages/Dashboard";
import Wallet from "./Pages/Wallet";
import History from "./Pages/History";
import Account from "./Pages/Account";
import Support from "./Pages/Support";
import LoginSignup from "./Pages/LoginSignup";
import { config } from './Services';
import HomeSupport from "./Pages/HomeSupport";
import Auth from "./Auth";

function App() {
  const { dashboard, wallet, history, account, support } = config.routeconfig;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/homesupport" element={<HomeSupport />}/>
          

          <Route element = {<Auth/>}>
            <Route path={dashboard} element={<Dashboard />} />
            <Route path={wallet} element={<Wallet />} />
            <Route path={history} element={<History />} />
            <Route path={account} element={<Account />} />
            <Route path={support} element={<Support />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
