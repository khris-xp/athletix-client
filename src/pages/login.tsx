import React, { Fragment, useState } from "react";
import { NextPage } from "next";
import Layout from "@/layouts/Layout";
import { loginService } from "@/services";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface LoginProps {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const [user, setUser] = useState<LoginProps>({ email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await loginService(user.email, user.password);
      setUser({ ...user, email: "", password: "" });
      toast.success("Login Success");
    } catch (err) {
      toast.error("Login Failed");
    }
  };
  return (
    <Fragment>
      <Layout title="Athletix | Login">
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen pb-40">
            <div className="max-w-xl w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUser({ ...user, email: event.target.value });
                        event.preventDefault();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      value={user.password}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUser({ ...user, password: event.target.value });
                        event.preventDefault();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Do not have an account yet?
                    <Link
                      href="/register"
                      className="ml-2 font-medium text-blue-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default LoginPage;
