import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import { setContext } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import { Observable } from "rxjs";
import { useAuthStore } from "../stores/authStore";
import { authApi } from "./auth";

const httpLink = createHttpLink({
  uri: `${process.env.EXPO_PUBLIC_API_BASE_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  let token = await SecureStore.getItemAsync("accessToken");
  if (!token) {
    token = useAuthStore.getState().accessToken;
  }
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  const isUnauthorized =
    (CombinedGraphQLErrors.is(error) &&
      error.errors.some((e) => e.extensions?.code === "UNAUTHENTICATED")) ||
    (ServerError.is(error) && error.statusCode === 401);

  if (!isUnauthorized) return;

  return new Observable((observer) => {
    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

    if (!refreshToken) {
      clearTokens();
      observer.error(error);
      return;
    }

    SecureStore.getItemAsync("accessToken")
      .then(async (stored) => {
        const keepLogin = !!stored;
        const { data } = await authApi.refresh(refreshToken);
        await setTokens(data.accessToken, data.refreshToken, keepLogin);

        operation.setContext(({ headers = {} }: { headers: Record<string, string> }) => ({
          headers: { ...headers, Authorization: `Bearer ${data.accessToken}` },
        }));

        forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(async () => {
        await clearTokens();
        observer.error(error);
      });
  });
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
