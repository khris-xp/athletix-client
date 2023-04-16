import Layout from "@/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import { Hero, Card, Member } from "@/components";
import { getFieldService } from "@/services/field.services";
import { IField } from "@/interfaces/field";
import { member } from "@/constants/member";

interface Props {
  data: IField[];
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Layout>
      <Hero />
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-6 mt-10">
          <div className="mx-auto max-w-screen-sm">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Fields
            </h2>
            <p className="font-light text-fouth-color sm:text-xl dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              ullam minima omnis esse unde nesciunt nulla fuga reprehenderit
              inventore corporis, aliquid laborum sed nemo eius odio asperiores!
              Vero, iure cum.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto p-10 md:p-20 grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-y-20 transform duration-500">
        {/* TODO: if data from backend is json it can refactor code here */}
        {data.map((field: IField) => (
          <Card
            key={field._Field__id}
            id={field._Field__id}
            title={field._Field__name}
            description={field._Field__description}
            image={field._Field__image}
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

export default Home;
