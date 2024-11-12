import logotipo_horizontal_uac from "../../assets/images/logotipo_uac.png";

const PostulacionesHeader = () => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex justify-start items-center space-x-3 mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
        <img
          className="h-16 w-auto hidden sm:block"
          src={logotipo_horizontal_uac}
          alt="UAC Logo"
        />
        <h1 className="flex text-3xl font-gelion text-gray-900">
          Convocatorias UAC
        </h1>
        <button
          className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 lg:hidden"
        >
        </button>
      </div>
    </header>
  )
}

export default PostulacionesHeader;