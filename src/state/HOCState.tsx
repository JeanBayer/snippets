import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const withState = (Component: any) => {
  return function WrappedComponent(props: any) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  };
};
