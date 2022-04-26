import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account } from "./pages/Account";
import { Auth } from "./pages/Auth";
import { BookInformation } from "./pages/BookInformation";

import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:bookSlug' element={<BookInformation />} />
        <Route path='/account' element={<Account />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
