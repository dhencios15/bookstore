import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000 * 60,
      retry: 2,
    },
  },
});

import App from "./App";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: {
          green: [
            "#ddfff1",
            "#b0ffda",
            "#80ffc3",
            "#50ffac",
            "#28ff94",
            "#17e67b",
            "#0ab35f",
            "#008043",
            "#004d27",
            "#001b09",
          ],
          gray: [
            "#f8f0f2",
            "#d9d9d9",
            "#bfbfbf",
            "#a6a6a6",
            "#8c8c8c",
            "#737373",
            "#595959",
            "#404040",
            "#262626",
            "#120b0d",
          ],
          yellow: [
            "#fffada",
            "#ffefad",
            "#ffe57d",
            "#ffdb4b",
            "#ffd01a",
            "#e6b700",
            "#b38e00",
            "#806500",
            "#4e3d00",
            "#1d1400",
          ],
          "deep-white": [
            "#f8f0f2",
            "#d9d9d9",
            "#bfbfbf",
            "#a6a6a6",
            "#8c8c8c",
            "#737373",
            "#595959",
            "#404040",
            "#262626",
            "#120b0d",
          ],
        },
      }}
    >
      <App />
    </MantineProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
