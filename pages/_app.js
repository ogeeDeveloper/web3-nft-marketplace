import { ThemeProvider } from 'next-themes'

import { Navbar, Footer } from '../components'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class" enableSystem={false}>
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  </ThemeProvider>
)

export default MyApp
