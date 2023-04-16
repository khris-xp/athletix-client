import { Fragment } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getNewService } from "@/services/news.services";
import Layout from "@/layouts/Layout";
import { NewsCard } from "@/components";
import { INews } from "@/interfaces/news";

interface Props {
  data: INews[];
}

const News: NextPage<Props> = ({ data }) => {
  return (
    <Fragment>
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-5 pb-24 pt-4 mx-auto max-w-7x1">
            <div className="flex flex-wrap w-full mb-4 p-4">
              <div className="w-full mb-6 lg:mb-0">
                <h1 className="sm:text-4xl text-5xl font-bold title-font mb-2 text-gray-900">
                  News
                </h1>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              {data.map((news: INews) => (
                <NewsCard
                  key={news._News__id}
                  id={news._News__id}
                  title={news._News__title}
                  description={news._News__content}
                  createdDate={news._News__created_at}
                  image={news._News__image_url}
                />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getNewService();
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
  } catch (err: unknown) {
    return {
      props: {},
    };
  }
};

export default News;
