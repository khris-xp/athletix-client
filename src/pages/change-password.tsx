import { NextPage } from 'next'
import { Fragment, useState } from 'react'
import Layout from '@/layouts/Layout'
import { IUserChangePassword } from '@/interfaces/user'
import { UserChangePassword } from '@/constants/user'
import { changeUserPasswordService } from '@/services'
import { toast } from 'react-hot-toast'
import router from 'next/router'
import { Loading, Error } from '@/components';
import { useAuth } from '@/context/auth'

const ChangePasswordPage: NextPage = () => {
  const [changePassword, setChangePassword] = useState<IUserChangePassword>(UserChangePassword)
  const { isAuthenticated, isLoading, isCustomer } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated && !isCustomer) {
    return <Error title='401' />
  }

  const handleChangePassword = async (event: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      if (changePassword.new_password !== changePassword.confirm_new_password) {
        toast.error("New Password and Confirm Password not match");
        return;
      }
      await changeUserPasswordService({
        old_password: changePassword.old_password,
        new_password: changePassword.new_password,
      });
      setChangePassword(UserChangePassword);
      router.push('/profile');
      toast.success("Change Password Success");
    } catch (err) {
      toast.error("Change Password Failed");
    }
  };

  return (
    <Fragment>
      <Layout title="Athletix | Change Password">
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen pb-40">
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Change Password
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleChangePassword}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Old Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setChangePassword({
                          ...changePassword,
                          old_password: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setChangePassword({
                          ...changePassword,
                          new_password: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setChangePassword({
                          ...changePassword,
                          confirm_new_password: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default ChangePasswordPage;
