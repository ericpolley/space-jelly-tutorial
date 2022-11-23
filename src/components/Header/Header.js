import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Eric's shop</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="#">
              <a>Link1</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Link2</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Link3</a>
            </Link>
          </li>
        </ul>
        <div className="snipcart-checkout">
        <p className={styles.headerCart}>
          <button>
            
          
            <FaShoppingCart />
            
           <span>
              <div class="snipcart-summary"><span class="snipcart-total-price"></span></div>
            </span>
          </button>
        </p>
        </div>
        <ul className={styles.headerLocales}>
          <li>
            <Link href="#">
              <a>
                ES
              </a>
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  )
}

export default Header;