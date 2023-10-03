import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "../src/components/pages/AppLayout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./i18n";
import { ConfigProvider } from "antd";
import { DirectionType } from "antd/es/config-provider";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider direction={t("config.direction") as DirectionType}>
            <AppLayout />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
