import Head from 'next/head'
import Link from 'next/link';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import products from '@data/products';
import Image from 'next/image';
import styles from '@styles/Page.module.scss'

export default function Home({ home, products }) {
  console.log('products:', products)
  console.log("home:", home)
  const { heroTitle, heroText, heroLink, heroBackground } = home;
  return (
    <Layout>
      <Head>
        <title>Eric's Space Jelly Gear</title>
        <meta name="description" content="shop NOW!" />
      </Head>

      <Container>
        <h1 className="sr-only">Eric's Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href={ heroLink }>
            <a>
              <div className={styles.heroContent}>
                <h2>{ heroTitle }.</h2>
                <p>{ heroText }</p>
              </div>
              <img className={styles.heroImage} width={heroBackground.width } height={heroBackground.height } src={heroBackground.url} alt="123" />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.slice(0, 4).map(product => {
            return (
              <li key={product.slug}>
                <Link href={`products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img width={product.image.width} height={product.image.height} src={product.image.url} alt="123" />
                    </div>
                    <h3 className={styles.productTitle}>
                      { product.name }
                    </h3>
                    <p className={styles.productPrice}>
                      ${ product.price }
                    </p>
                  </a>
                </Link>
                <p>
                <Button
              className="snipcart-add-item"
              data-item-id={product.id}
              data-item-price={product.price}
              data-item-url={`/products/${product.slug}`}
              data-item-description={product.description}
              data-item-image={product.image.url}
              data-item-name={product.name}
              >
                Add to Cart
              </Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clalkc3x423d101tc67dx7bt2/master',
    cache: new InMemoryCache(),
  });
    const data = await client.query({
      query: gql`
      query Home {
        page(where: {slug: "home"}) {
          id
          heroBackground {
            height
            width
            url
          }
          heroLink
          heroText
          heroTitle
          name
          slug
        }


  products(first: 4) {
    name
    price
    id
    slug
    description {
      html
    }
    image {
      height
      url
      width
    }
  }

        
      }
      
      `
    })

    console.log("data:", data);
    const home = data.data.page;
    const products = data.data.products;

  return {
    props: {
      
     home,
     products

    }
  }
}

