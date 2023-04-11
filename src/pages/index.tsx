import Layout from '@/layouts/Layout'
import { NextPage } from 'next'
import Hero from '@/components/Hero'

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <section>
        <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-6 mt-10'>
          <div className='mx-auto max-w-screen-sm'>
            <h2
              className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'
            >
              Our Fields
            </h2>
            <p className='font-light text-fouth-color sm:text-xl dark:text-gray-400'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque ullam
              minima omnis esse unde nesciunt nulla fuga reprehenderit inventore
              corporis, aliquid laborum sed nemo eius odio asperiores! Vero, iure
              cum.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home