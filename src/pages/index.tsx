import Layout from "@/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import { Hero, Card, Member } from "@/components";
import { getFieldService } from "@/services";
import { IField } from "@/interfaces/field";
import { member } from "@/constants/member";
import Link from "next/link";
import { useAuth } from "@/context/auth";

interface Props {
  data: IField[];
}

const HomePage: NextPage<Props> = ({ data }) => {
  const { isAdmin } = useAuth();
  return (
    <Layout title="Athletix | Home">
      <Hero />
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-6 mt-10">
          <div className="mx-auto max-w-screen-sm">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Fields
            </h2>
            <p className="font-light text-fouth-color sm:text-xl dark:text-gray-400">
              Our booking site offers a wide range of pitches to choose from, such as football pitches, basketball courts, and more.
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="container mx-auto p-5 pl-24">
            <Link href="/field/create">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 focus:outline-none">
                + Create
              </button>
            </Link>
          </div>
        )}
      </section>
      <section className="container mx-auto p-10 md:p-20 grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-y-20 transform duration-500">
        {data.map((field: IField) => (
          <Card
            key={field.id}
            id={field.id}
            title={field.name}
            description={field.description}
            image={field.image}
          />
        ))}
      </section>
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {member.map((member) => (
          <Member key={member.id} {...member} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data: IField = await getFieldService();
    if (data) {
      return {
        props: {
          data,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
};

export default HomePage;
