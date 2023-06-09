import { Fragment } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { deleteNewService } from "@/services";
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
            className="w-full h-60"
            src={
              /^https:/.test(image) ? image : `http://127.0.0.1:4000/${image}`
            }
            alt="field-image"
            width={1000}
            height={1000}
          />
          </Link>
          <h3 className="tracking-widest text-blue-500 text-base font-bold title-font mt-4">
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
