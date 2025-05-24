import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validación con Yup
const schema = yup.object().shape({
  waists: yup
    .number()
    .typeError("Ingresa una medida de cintura válida")
    .required("La cintura es obligatoria")
    .min(40, "La cintura mínima es 40 cm")
    .max(150, "La cintura máxima es 150 cm"),

  chest: yup
    .number()
    .typeError("Ingresa una medida de pecho válida")
    .required("El pecho es obligatorio")
    .min(50, "El pecho mínimo es 50 cm")
    .max(200, "El pecho máximo es 200 cm"),

  rightarm: yup
    .number()
    .typeError("Ingresa una medida válida para el brazo derecho")
    .required("El brazo derecho es obligatorio")
    .min(15, "Mínimo 15 cm")
    .max(60, "Máximo 60 cm"),

  leftarm: yup
    .number()
    .typeError("Ingresa una medida válida para el brazo izquierdo")
    .required("El brazo izquierdo es obligatorio")
    .min(15, "Mínimo 15 cm")
    .max(60, "Máximo 60 cm"),

  rightleg: yup
    .number()
    .typeError("Ingresa una medida válida para la pierna derecha")
    .required("La pierna derecha es obligatoria")
    .min(30, "Mínimo 30 cm")
    .max(100, "Máximo 100 cm"),

  leftleg: yup
    .number()
    .typeError("Ingresa una medida válida para la pierna izquierda")
    .required("La pierna izquierda es obligatoria")
    .min(30, "Mínimo 30 cm")
    .max(100, "Máximo 100 cm"),
});

// Tipado de datos
interface FormData {
  waists: number;
  chest: number;
  rightarm: number;
  leftarm: number;
  rightleg: number;
  leftleg: number;
}

const BodyMeasurements = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      waists: 80,
      chest: 90,
      rightarm: 30,
      leftarm: 30,
      rightleg: 60,
      leftleg: 60,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    alert("Datos registrados correctamente");
    console.log(data);
    // Aquí puedes hacer una petición a tu API
    // por ejemplo: axios.post("/api/measurements", data)
    navigate("../studentHome");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold bg-black text-white py-2 px-4 rounded">
        Registro de Medidas Corporales
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo genérico reutilizable */}
        {[
          { name: "waists", label: "Cintura (cm)" },
          { name: "chest", label: "Pecho (cm)" },
          { name: "rightarm", label: "Brazo derecho (cm)" },
          { name: "leftarm", label: "Brazo izquierdo (cm)" },
          { name: "rightleg", label: "Pierna derecha (cm)" },
          { name: "leftleg", label: "Pierna izquierda (cm)" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            <Controller
              name={name as keyof FormData}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="number"
                    {...field}
                    className={`border rounded px-3 py-2 w-full ${
                      errors[name as keyof FormData] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Registrar medidas
        </button>
      </form>
    </div>
  );
};

export default BodyMeasurements;