import { Fragment } from "react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { getNewDetailService, getNewService } from "@/services/news.services";
import Layout from "@/layouts/Layout";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Loading, Error } from "@/components";
import { useAuth } from "@/context/auth";

interface Props {
  newsId: string;
  title: string;
  description: string;
  createdDate: string;
  imageUrl: string;
}

const NewsDetailPage: NextPage<Props> = ({
  title,
  description,
  createdDate,
  imageUrl,
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  let formattedDate = "";
  let formattedTime = "";
  if (createdDate) {
    const createdFormatDate: Date = new Date(createdDate);
    if (!isNaN(createdFormatDate.getTime())) {
      const createdAt: string = format(createdFormatDate, "dd MMM yyyy HH:mm");
      [formattedDate, formattedTime] = createdAt.split("  ");
    }
  }

  return (
    <Fragment>
      <Layout title="Athletix | News">
        <div className="my-6 px-6 mx-auto">
          <section className="mb-32 text-gray-800 text-center">
            <div className="flex flex-wrap justify-center mb-12">
              <div className="grow-0 shrink-0 basis-auto w-full md:w-10/12 px-3">
                <div className="relative mx-auto mb-6 max-w-screen-lg overflow-hidden rounded-xl py-32 text-center shadow-xl shadow-gray-300">
                  <Image
                    src={
                      /^https:/.test(imageUrl)
                        ? imageUrl
                        : `http://127.0.0.1:4000/${imageUrl}`
                    }
                    alt="banner-image"
                    className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
                    height={1000}
                    width={1000}
                  />
                </div>
              </div>
              <div className="grow-0 shrink-0 basis-auto w-full md:w-8/12 xl:w-6/12 px-3">
                <h5 className="text-lg font-bold mb-3">{title}</h5>
                <p className="text-gray-500 mb-4">
                  <small>
                    Published{" "}
                    <u>
                      {formattedDate} at {formattedTime}
                    </u>
                  </small>
                </p>
                <p className="mb-6">{description}</p>
                <Link
                  href="/news"
                  className="text-blue-500 flex justify-end font-bold underline"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const newsItems = await getNewService();
    const paths = newsItems.map((newsItem: { id: string }) => ({
      params: { newsId: newsItem.id },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    if (!params || !params.newsId || Array.isArray(params.newsId)) {
      return {
        notFound: true,
      };
    }
    const { newsId } = params;
    const newsItem = await getNewDetailService(newsId);
    if (!newsItem) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        newsId,
        title: newsItem.title,
        description: newsItem.content,
        createdDate: newsItem.created_at,
        imageUrl: newsItem.image_url,
      },
    };
  } catch (err: unknown) {
    return {
      notFound: true,
    };
  }
};

export default NewsDetailPage;
