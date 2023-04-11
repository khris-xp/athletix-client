import { Inter } from 'next/font/google'
import Layout from '@/layouts/Layout'
import { NextPage } from 'next'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </Layout>
  )
}

export default Home