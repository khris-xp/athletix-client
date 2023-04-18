import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { Fragment, useState } from "react";
import Layout from "@/layouts/Layout";
import Image from "next/image";
import {
  getNewService,
  getNewDetailService,
  editNewService,
} from "@/services/news.services";
import { IUpdateNew } from "@/interfaces/news";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/auth";
import { Error, Loading } from '@/components';

interface Props {
  news_id: string;
  title: string;
  content: string;
  createdDate: string;
  image_url: string;
}

const EditNewsPage: NextPage<Props> = ({
  news_id,
  title,
  content,
  image_url,
}) => {
  const [news, setNews] = useState<IUpdateNew>({
    title: title,
    content: content,
    image_url: image_url,
    draft: false,
  });

  const { isLoading, isAdmin } = useAuth();
  if (isLoading) {
    return <Loading />
  }
  if (!isAdmin) {
    return <Error />
  }

  const handleEditNews = async () => {
    try {
      await editNewService(news, news_id);
      toast.success("Edit News Success");
    } catch (err) {
      toast.error("Edit News Failed");
    }
  };

  return (
    <Fragment>
      <Layout title="Athletix | Edit News">
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto pb-20">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Edit News</p>
                  <p>Please fill out all the fields.</p>
                  {!news.image_url ? (
                    <Image
                      src="https://wipelectric.com/wp-content/uploads/2021/06/Ref-Trinoi1-1024x679.jpg"
                      alt="banner-image"
                      className="mt-6 px-5 lg:px-2 lg:pr-10"
                      height={1000}
                      width={1000}
                    />
                  ) : (
                    <Image
                      src={news.image_url}
                      alt="banner-image"
                      className="mt-6 px-5 lg:px-2 lg:pr-10"
                      height={1000}
                      width={1000}
                    />
                  )}
                </div>
                <div className="lg:col-span-2">
                  <form>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>News Title</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={news.title}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setNews({ ...news, title: event.target.value });
                          }}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label>News Content</label>
                        <textarea
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 pb-16"
                          value={news.content}
                          onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setNews({ ...news, content: event.target.value });
                          }}
                        ></textarea>
                      </div>
                      <div className="md:col-span-5">
                        <label>News Image Url</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={news.image_url}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setNews({ ...news, image_url: event.target.value });
                          }}
                        />
                      </div>
                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="button"
                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => handleEditNews()}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
        news_id: newsItem.id,
        title: newsItem.title,
        content: newsItem.content,
        createdDate: newsItem.created_at,
        image_url: newsItem.image_url,
      },
    };
  } catch (err: unknown) {
    return {
      notFound: true,
    };
  }
};

export default EditNewsPage;
