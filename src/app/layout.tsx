import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Calorie Tracker',
  description: 'Track your calorie intake',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <header>
          <nav className="navbar">
            <div className="container">
              <Link href="/" className="navbar-brand">
                Calorie Tracker
              </Link>
              <ul className="nav-links">
                <li>
                  <Link href="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/details" className="nav-link">
                    Details
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header> */}
        {children}
      </body>
    </html>
  )
}