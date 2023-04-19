import { Fragment } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { deleteFieldService } from "@/services";
import { NextRouter, useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
}

const Card = ({ id, image, title, description }: Props) => {
  const { isAdmin } = useAuth();
  const router: NextRouter = useRouter();

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteFieldService(id);
      toast.success("Delete field success");
      setTimeout(() => {
        router.reload();
      }, 400);
    } catch (err: unknown) {
      toast.error("Delete field failed");
    }
  };

  return (
    <Fragment>
      <div className="shadow-md mx-auto max-w-sm transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
        <div className="max-h-140 overflow-hidden">
        {((image[0] as string) != "h") ? (
          <Image
            className="w-full h-60"
            src={`http://localhost:4000/${image}`}
            alt="field-image"
            width={1000}
            height={1000}
          />
        ) : (
          <Image
            className="w-full h-60"
            src={image}
            alt="field-image"
            width={1000}
            height={1000}
          />
        )}
        </div>
        <div className="p-7 my-auto">
          <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
          <p className="text-xl font-light leading-relaxed text-gray-400 mt-5">
            {description}
          </p>
        </div>
        {isAdmin && (
          <Fragment>
            <div className="p-8">
              <Link href={`/field/edit/${id}`}>
                <button className="text-blue-500 mt-2 font-semibold hover:underline">
                  Edit
                </button>
              </Link>
              <button
                className="text-red-500 ml-2 mt-2 font-semibold hover:underline"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Card;
