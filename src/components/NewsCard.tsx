import { Fragment } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { deleteNewService } from "@/services/news.services";
import { NextRouter, useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface Props {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  image: string;
}

const NewsCard = ({ id, title, description, createdDate, image }: Props) => {
  const createdFormatDate: Date = new Date(createdDate);
  const { isAdmin } = useAuth();
  const router: NextRouter = useRouter();
  const createdAt: string = format(createdFormatDate, "dd MMM yyyy  HH:mm");
  const [formattedDate, formattedTime]: string[] = createdAt.split("  ");

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteNewService(id);
      toast.success("Delete news success");
      setTimeout(() => {
        router.reload();
      }, 400);
    } catch (err) {
      toast.error("Delete news failed");
    }
  };
  return (
    <Fragment>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="bg-white p-6 rounded-lg">
          <Link href={`/news/${id}`}>
            <Image
              className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6"
              src={`${image}`}
              alt="Image Size 720x400"
              height={1000}
              width={1000}
            />
          </Link>
          <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">
            News
          </h3>
          <h2 className="text-lg text-gray-900 font-medium title-font my-2 uppercase">
            {title}
          </h2>
          <p className="leading-relaxed text-base">{description}</p>
          <p className="mt-4 text-xs text-gray-500">
            {" "}
            Created on: {formattedDate} at {formattedTime}
          </p>
          {isAdmin && (
            <Fragment>
              <Link href={`/news/edit/${id}`}>
                <button className="text-blue-500 mt-2 font-semibold hover:underline">
                  Edit
                </button>
              </Link>
              <button
                className="text-red-500 ml-2 mt-2 font-semibold hover:underline"
                onClick={handleDelete}
              >
                Delete
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NewsCard;
