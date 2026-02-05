import { LoaderCircle } from "lucide-react"

const LoadingBar = ({isLoading}) => {

  if (!isLoading) return null;

  return (
    <div className="bg-gray-500/70 size-full flex justify-center items-center inset-0 text-white fixed z-50">
        <LoaderCircle className="animate-spin [animation-duration:2s] w-10 h-10" />
    </div>
  )
}

export default LoadingBar