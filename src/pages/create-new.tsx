import { Fragment, useState } from 'react'
import Layout from '@/layouts/Layout'
import Image from 'next/image'
import { NextPage } from 'next'
import { CreateNewInitialValues } from '@/constants/new'
import { ICreateNew } from '@/interfaces/news'
import { createNewService } from '@/services/news.services'
import { toast } from 'react-hot-toast'

const CreateNew: NextPage = () => {
    const [news, setNews] = useState<ICreateNew>(CreateNewInitialValues);

    const handleCreateNews = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await createNewService(news);
            setNews(CreateNewInitialValues);
            toast.success('Create News Success');
        } catch (err) {
            toast.error('Create News Failed');
        }
    }
    return (
        <Fragment>
            <Layout>
                <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto pb-20">
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Create News</p>
                                    <p>Please fill out all the fields.</p>
                                    {!news.image_url ? (<Image
                                        src='https://wipelectric.com/wp-content/uploads/2021/06/Ref-Trinoi1-1024x679.jpg'
                                        alt='banner-image'
                                        className='mt-6 px-5 lg:px-2 lg:pr-10'
                                        height={1000}
                                        width={1000}
                                    />) : (
                                        <Image
                                            src={news.image_url}
                                            alt='banner-image'
                                            className='mt-6 px-5 lg:px-2 lg:pr-10'
                                            height={1000}
                                            width={1000}
                                        />
                                    )}
                                </div>
                                <div className="lg:col-span-2">
                                    <form onSubmit={handleCreateNews}>
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label>News Title</label>
                                                <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setNews({ ...news, title: event.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className="md:col-span-5">
                                                <label>News Content</label>
                                                <textarea className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 pb-16"
                                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                        setNews({ ...news, content: event.target.value })
                                                    }}
                                                >
                                                </textarea>
                                            </div>
                                            <div className="md:col-span-5">
                                                <label>News Image Url</label>
                                                <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setNews({ ...news, image_url: event.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button type='submit' className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default CreateNew