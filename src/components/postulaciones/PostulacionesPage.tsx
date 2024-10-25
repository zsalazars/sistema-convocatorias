import FileDropzone from "./FileDropzone";
import PostulacionesHeader from "./PostulacionesHeader";

const Postulaciones = () => {
  return (
    <div>
      <PostulacionesHeader />
      <div className="flex flex-col container xl:w-1/3 mx-auto my-10 px-5">
        
        <h2 className="text-3xl font-gelion">Administrador de redes</h2>
        <FileDropzone />


      </div>
    </div>
  )
}

export default Postulaciones;