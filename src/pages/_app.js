import "@/styles/globals.css";
import Layout from "@/layouts/Layout";

export default function App({ Component, pageProps }) {
  const NestedLayout = Component.Layout || EmptyLayout;
  return (
    <Layout>
      <NestedLayout>
        <Component {...pageProps} />
      </NestedLayout>
    </Layout>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;
