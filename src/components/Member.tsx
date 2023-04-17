import { Fragment } from "react";
import Icon from "./Icon";
import Image from "next/image";

interface Props {
  image: string;
  name: string;
  studentId: string;
}

const Member = ({ image, name, studentId }: Props) => {
  return (
    <Fragment>
      <div className="text-center text-gray-500 dark:text-gray-400 mb-32">
        <Image
          className="mx-auto mb-4 w-36 h-36 rounded-full"
          src={image}
          alt="member-Avatar"
          height={1000}
          width={1000}
        />
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="#">{name}</a>
        </h3>
        <p>{studentId}</p>
        <Icon />
      </div>
    </Fragment>
  );
};

export default Member;
