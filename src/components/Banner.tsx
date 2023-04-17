import React, { Fragment } from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <Fragment>
      <div className="relative mx-auto mb-20 max-w-screen-lg overflow-hidden rounded-xl bg-blue-400/60 py-32 text-center shadow-xl shadow-gray-300">
        <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
          Book an appointment
        </h1>
        <p className="mt-6 text-lg text-white">
          Get an appointment with our experienced accountants
        </p>
        <Image
          src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="banner-image"
          className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
          height={1000}
          width={1000}
        />
      </div>
    </Fragment>
  );
};

export default Banner;
