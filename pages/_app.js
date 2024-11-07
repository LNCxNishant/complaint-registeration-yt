import '../styles/globals.css';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const clientID = '466a7ec885c491bf25d06b4471c97787';

  return (
    <ThirdwebProvider activeChain={11155111} clientId={clientID}>
      {/* Rendering the main component */}
      <Component {...pageProps} />
      {/* Adding a toaster component */}
      <Toaster />
    </ThirdwebProvider>
  );
}

// Exporting the app as the default export
export default MyApp;
