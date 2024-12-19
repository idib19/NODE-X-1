import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import QueryProvider from '@/components/providers/query-provider'

//components-personnal imports
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'

import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider>


        <html lang="en" suppressHydrationWarning>

          <body className={inter.className}>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
              <ToasterProvider />
                <ModalProvider />
                {children}

            </ThemeProvider>
            </QueryProvider>
          </body>

        </html>
   
  
    </ClerkProvider>

  )
}
