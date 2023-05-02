import { Fragment } from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <Fragment>
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            "url('https://media.istockphoto.com/id/1294407182/photo/playing-field.jpg?b=1&s=170667a&w=0&k=20&c=UqobgP0B9PnhDYKCXOnl0JRfU5Grow-ZwpprUoTTc2s=')",
          height: "500px",
        }}
      >
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 mt-16">
                Web application designed for booking sports fields
                in a university setting.
              </h1>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                <span className="relative">Booking</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
