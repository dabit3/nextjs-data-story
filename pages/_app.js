import '../styles/globals.css';
import { css } from 'emotion';
import Link from 'next/link';
import '../configureAmplify';
import checkUser from '../helpers/checkUser';

export default function MyApp({ Component, pageProps }) {
   const user = checkUser();
  return (
    <div>
      <nav className={navStyle}>
        <AppLink title="Home" path="/" />
        <AppLink title="Profile" path="/profile" />
        { user && <AppLink title="Create Post" path="/create-post" /> }
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

const AppLink = ({ title, path }) => (
  <Link href={path}>
    <span className={linkStyle}>{title}</span>
  </Link>
)

const linkStyle = css`
  margin-right: 20px;
  cursor: pointer;
`

const navStyle = css`
  display: flex;
  padding: 30px;
  border-bottom: 1px solid #ddd;
`