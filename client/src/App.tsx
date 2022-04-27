import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { modals } from "./components/modals";

import { Account } from "./pages/Account";
import { Auth } from "./pages/Auth";
import { BookInformation } from "./pages/BookInformation";
import { Home } from "./pages/Home";

function App() {
  return (
    // @ts-ignore
    <ModalsProvider modals={modals}>
      <NotificationsProvider position='top-right'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book/:bookSlug' element={<BookInformation />} />
            <Route path='/account' element={<Account />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </ModalsProvider>
  );
}

export default App;
