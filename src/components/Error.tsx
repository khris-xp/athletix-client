import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";

interface Props {
  title: string,
}

const Error: NextPage<Props> = ({title}) => {
  return (
    <Fragment>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <Image
          src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
          className="absolute h-full w-full object-cover"
          alt="404-image"
          height={1000}
          width={1000}
        />
        <div className="inset-0 bg-black opacity-25 absolute"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div className="w-full font-mono flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
              You are all alone here
            </h1>
            <p className="font-extrabold my-14 text-4xl text-white animate-bounce">
              {title}
            </p>
            <Link href="/">
              <p className="font-extrabold my-14 text-4xl text-white animate-bounce">
                Go Back to home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Error;
