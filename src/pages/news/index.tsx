import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getNewService } from "@/services";
import Layout from "@/layouts/Layout";
import { NewsCard } from "@/components";
import { INews } from "@/interfaces/news";

interface Props {
  data: INews[];
}

const NewsPage: NextPage<Props> = ({ data }) => {
  return (
    <Fragment>
      <Layout title="Athletix | News">
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
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  description={news.content}
                  createdDate={news.created_at}
                  image={news.image_url}
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

export default NewsPage
