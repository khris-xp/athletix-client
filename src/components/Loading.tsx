import { NextPage } from "next"

const Loading: NextPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center space-x-2 bg-gray-200  bg-opacity-50">
            <div className="flex items-center justify-center space-x-2 animate-bounce">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
        </div>
    )
}

export default Loading