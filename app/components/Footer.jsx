import '../css/footer.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className='center'>
        <span className="line"></span>
        <h3>GLAMK</h3>
        <span className="line"></span>
      </div>
      <div id='sections'>
        <ul>
          <h4>GlamK</h4>
          <Link href="search?param=blush">
            <li>Blush</li>
          </Link>
          <Link href="search?param=cologne">
            <li>Cologne</li>
          </Link>
        </ul>
        <ul>
          <h4>About Glamk</h4>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/about">
            <li>FAQ</li>
          </Link>
          <Link href="/Access">
            <li>Accessibility</li>
          </Link>
        </ul>
      </div>
      <p>© 2024 GlamK Inc. All rights reserved.</p>
    </footer>
  )
}
