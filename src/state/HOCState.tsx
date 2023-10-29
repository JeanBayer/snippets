import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export const withState = (Component: any) => {
  return function WrappedComponent(props: any) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  };
};
