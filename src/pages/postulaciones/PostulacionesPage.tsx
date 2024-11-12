import PostulacionesHeader from "../../components/layouts/PostulacionesHeader";
import background from "../../assets/images/background.jpg"

const Postulaciones = () => {
  return (
    <div>
      <PostulacionesHeader />
      <img
        src={background}
        className="w-full h-[400px] object-cover" // Cambia h-[300px] al tamaño que prefieras
        alt="Background"
      />
    </div>
  );
};

export default Postulaciones;
