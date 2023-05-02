import Layout from "@/layouts/Layout";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import Link from "next/link";
import { registerService } from "@/services";
import { UserRegisterInitialValues } from "@/constants/user";
import { IUserRegister } from "@/interfaces/user";
import { toast } from "react-hot-toast";

const RegisterPage: NextPage = () => {
    const [user, setUser] = useState<IUserRegister>(UserRegisterInitialValues);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            event.preventDefault();
            await registerService(
                user.fullname,
                user.email,
                user.password,
                user.phone_number,
                user.address,
                user.birth_date,
                user.emergency_contact_fullname,
                user.emergency_contact_phone_number
            );
            setUser({
                ...user,
                fullname: "",
                email: "",
                password: "",
                phone_number: "",
                address: "",
                birth_date: "",
                emergency_contact_fullname: "",
                emergency_contact_phone_number: "",
            });
            toast.success("Register Success");
        } catch (err) {
            toast.error("Register Failed");
        }
    };
    return (
        <Fragment>
            <Layout title="Athletix | Register">
                <section className="bg-gray-50">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen pb-40">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-6xl xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Create and account
                                </h1>
                                <form onSubmit={handleRegister}>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="text"
                                            name="floating_fullname"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setUser({ ...user, fullname: event.target.value });
                                                event.preventDefault();
                                            }}
                                            required
                                        />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Fullname
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="email"
                                            name="floating_email"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setUser({ ...user, email: event.target.value });
                                                event.preventDefault();
                                            }}
                                            required
                                        />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="password"
                                            name="floating_password"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setUser({ ...user, password: event.target.value });
                                                event.preventDefault();
                                            }}
                                            required
                                        />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Password
                                        </label>
                                    </div>
                                    <div className="grid md:grid-cols-3 md:gap-12 space-y-3 md:space-y-0">
                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="text"
                                                name="floating_address"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setUser({ ...user, address: event.target.value });
                                                    event.preventDefault();
                                                }}
                                                required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Address
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="text"
                                                name="floating_birth_date"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setUser({ ...user, birth_date: event.target.value });
                                                    event.preventDefault();
                                                }}
                                                required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Birth Date
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="tel"
                                                name="floating_phone_number"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setUser({
                                                        ...user,
                                                        phone_number: event.target.value,
                                                    });
                                                    event.preventDefault();
                                                }}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_last_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Phone Number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6 mt-6">
                                        <div className="relative z-0 w-full mb-3 group">
                                            <input
                                                type="text"
                                                name="floating_emergency_contact_fullname"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setUser({
                                                        ...user,
                                                        emergency_contact_fullname: event.target.value,
                                                    });
                                                    event.preventDefault();
                                                }}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_phone"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Emergency Contact Fullname
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-3 group">
                                            <input
                                                type="tel"
                                                name="floating_emergency_contact_phone_number"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setUser({
                                                        ...user,
                                                        emergency_contact_phone_number: event.target.value,
                                                    });
                                                    event.preventDefault();
                                                }}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_company"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 tbrl htmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Emergency Contact Phone Number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-6 text-center">
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Sign up
                                        </button>
                                        <p className="text-sm font-light text-gray-500">
                                            Already have account yet ?
                                            <Link
                                                href="/login"
                                                className="ml-2 font-medium text-blue-600 hover:underline"
                                            >
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </Fragment>
    );
};

export default RegisterPage;