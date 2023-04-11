import Layout from '@/layouts/Layout'
import { NextPage } from 'next'
import Hero from '@/components/Hero'
import Card from '@/components/Card'
import Member from '@/components/Member'

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
      <section
        className='container mx-auto p-10 md:p-20 grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-y-20 transform duration-500'
      >
        <Card
          title='Football Field'
          description='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          image='https://editorial.uefa.com/resources/025c-0f8e775cc072-f99f8b3389ab-1000/the_new_tottenham_hotspur_stadium_has_an_unusual_flexible_playing_surface.jpeg'
        />

        <Card
          title='Basketball Field'
          description='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          image='https://5.imimg.com/data5/SELLER/Default/2020/12/UI/LQ/TM/475165/synthetic-acrylic-basketball-court-500x500.jpeg'
        />

        <Card
          title='Football Field'
          description='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
          image='https://editorial.uefa.com/resources/025c-0f8e775cc072-f99f8b3389ab-1000/the_new_tottenham_hotspur_stadium_has_an_unusual_flexible_playing_surface.jpeg'
        />
      </section>
      <div
        className='grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      >
        <Member
          name='Khris Bharmmano'
          studentId='65010107'
          image='https://avatars.githubusercontent.com/u/84142253?v=4'
        />
        <Member
          name='Kittipod Lambangchang'
          studentId='65010077'
          image='https://avatars.githubusercontent.com/u/54632895?v=4'
        />
        <Member
          name='Teetouch Jaknamon'
          studentId='65010478'
          image='https://avatars.githubusercontent.com/u/24198910?v=4'
        />
        <Member
          name='Chollasak Anuwareepong'
          studentId='65010196'
          image='https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/316961529_1534751090321595_5539287266596493204_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHEuFsaTFVOoSnyjzso4XjavOYAES-GY5-85gARL4Zjn1YEJn_j2zWHUqM1n_V1xaNQaqPTexbgXCc8DDdGBKSk&_nc_ohc=h9Kv8ywaEGEAX_6zO3J&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfC-GZEJ6qROYetDYRDcQHKTSUbdChdkt-0EpDrvv8SXfg&oe=64394D5D'
        />
      </div>
    </Layout >
  )
}

export default Home