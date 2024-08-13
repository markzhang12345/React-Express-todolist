import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider, useAuth } from "@/reducers/AuthContext";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { state } = useAuth();
  console.log(state);
  return (
    <CookiesProvider>
      <AuthProvider>
        {router.pathname === "/login" || router.pathname === "/register" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </CookiesProvider>
  );
}
