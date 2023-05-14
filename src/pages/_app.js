import "@/styles/globals.css";
import Layout from "@/layouts/Layout";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }) {
  const NestedLayout = Component.Layout || EmptyLayout;
  return (
    <Provider store={store}>
      <Layout>
        <NestedLayout>
          <Component {...pageProps} />
        </NestedLayout>
      </Layout>
    </Provider>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;
