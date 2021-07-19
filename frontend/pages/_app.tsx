import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globalStyles";
import { ThemeProvider } from "../styles/ThemeProvider";
import { ThemeContextProvider } from "../context/ThemeContext";
import Layout from "../components/layout";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { UserContextProvider } from "../context/UserContext";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <GlobalStyle />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </ApolloProvider>
    </>
  );
}
export default MyApp;
