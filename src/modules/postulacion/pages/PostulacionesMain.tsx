import logo_uandina from "@/assets/images/logotipo_blanco_horizontal_uac.png"
import PostulacionesList from "../components/PostulacionesList";

const PostulacionesMain = () => {
  return (
    <div>
      <div className="bg-uac text-white text-start w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <img src={logo_uandina} alt="Devsu Logo" className="w-80 mb-10" />
          <h2 className="text-5xl font-bold mb-4">Trabaja con nosotros</h2>
          <p className="text-lg py-2">
            Únete a la Universidad Andina del Cusco y forma parte de una comunidad <br /> comprometida con la excelencia académica y el desarrollo social.
          </p>
        </div>
      </div>
      <div className="max-w-6xl flex flex-col mx-auto mt-12">
        <h1 className="text-4xl text-center text-gray-800 font-semibold">Convocatorias UAC</h1>
        <p className="text-center text-xl text-gray-600 mt-4">
          Encuentra oportunidades laborales de acuerdo a tus intereses y habilidades en la Universidad Andina del Cusco.
        </p>
        <PostulacionesList />
      </div>
    </div>
  );
};

export default PostulacionesMain;
