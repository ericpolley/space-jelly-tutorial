import Head from 'next/head'
import Layout from '@components/Layout';
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '@styles/Product.module.scss'

export default function Product({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={ `buy ${product.name} Here!`} />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img width={product.image.width} height={product.image.height} src={product.image.url} alt="123" />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div className={styles.productDescription}>
              <div dangerouslySetInnerHTML={{__html: product.description?.html}} />
            </div>
            <p className={styles.productPrice}>
              ${product.price}
            </p>
            <p className={styles.productBuy}>
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
          </div>
        </div>
      </Container>
    </Layout>
  )
}


export async function getStaticProps({params}) {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clalkc3x423d101tc67dx7bt2/master',
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
    query Products($slug: String = "") {
      product(where: {slug: $slug}) {
        price
        name
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
    }`,
    variables: {
      slug: params.productSlug
    }
  });
  
  const product = data.data.product;

  console.log('data: = ', data);
  return {
    props: {
      product

    }
  }
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: 'https://api-us-west-2.hygraph.com/v2/clalkc3x423d101tc67dx7bt2/master',
    cache: new InMemoryCache(),
  });
  
  const data = await client.query({
    query: gql`
    query PageProducts {
products{
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
    } `
  });
   
  const paths = data.data.products.map(product => {
    return {
      params: {
        productSlug: product.slug
      }
      }
    })

  return {
    paths,
    fallback: false
  };
}