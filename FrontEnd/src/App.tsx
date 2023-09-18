import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "../src/components/pages/AppLayout";
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </Provider>
    </>
  )
}
export default App
