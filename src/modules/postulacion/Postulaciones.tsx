import background from "../../assets/images/background.jpg"
import PostulacionesList from "./components/PostulacionesList";

const Postulaciones = () => {
  return (
    <div>
      <img
        src={background}
        className="w-full h-[400px] object-cover" // Cambia h-[300px] al tamaño que prefieras
        alt="Background"
      />
      <div className="max-w-6xl flex flex-col mx-auto mt-12">
        <h1 className="text-3xl text-center text-gray-800">Convocatorias UAC</h1>
        <p className="text-center text-lg text-gray-600 mt-4">
          Encuentra oportunidades laborales en la Universidad Andina del Cusco. Encuentra trabajos de acuerdo a tus intereses y habilidades.
        </p>
        <PostulacionesList />
      </div>
    </div>
  );
};

export default Postulaciones;
