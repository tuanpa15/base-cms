import { ConfigProvider } from "antd";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootRouter from "./root-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([{ path: "*", element: <RootRouter /> }]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1d0157",
          },
        }}
      >
        <React.Suspense fallback={null}>
          <RouterProvider router={router} />
        </React.Suspense>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
