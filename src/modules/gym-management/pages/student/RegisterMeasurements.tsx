// RegisterMeasurements.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  gender: yup.string().required("El género es obligatorio"),
  height: yup.number().required().min(100).max(250),
  age: yup.number().required().min(10).max(80),
  weight: yup.number().required().min(30).max(200),
  goalWeight: yup.number().required().min(30).max(200),
});

const RegisterMeasurements = () => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: "",
      height: 160,
      age: 20,
      weight: 60,
      goalWeight: 60,
    },
  });

  const onSubmit = (data: any) => {
    alert("Datos registrados correctamente");
    console.log(data);
  };

  const gender = watch("gender");

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold bg-black text-white py-2 px-4 rounded">
        Registro Medidas Iniciales
      </h1>
      <h2 className="text-2xl font-bold">¡Ingresa tus medidas!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">
            Género<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-center gap-12">
            <img
              src="/male.png"
              alt="Hombre"
              className={`w-24 h-24 cursor-pointer border-4 ${
                gender === "male" ? "border-blue-600" : "border-transparent"
              }`}
              onClick={() => setValue("gender", "male")}
            />
            <img
              src="/female.png"
              alt="Mujer"
              className={`w-24 h-24 cursor-pointer border-4 ${
                gender === "female" ? "border-pink-500" : "border-transparent"
              }`}
              onClick={() => setValue("gender", "female")}
            />
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Altura */}
        <div>
          <label className="block font-semibold">Altura (cm)</label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="range"
                  min={100}
                  max={250}
                  {...field}
                  className="w-full"
                />
                <div className="text-center">{field.value} cm</div>
              </>
            )}
          />
        </div>

        {/* Edad */}
        <div>
          <label className="block font-semibold">Edad</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="range"
                  min={10}
                  max={80}
                  {...field}
                  className="w-full"
                />
                <div className="text-center">{field.value} años</div>
              </>
            )}
          />
        </div>

        {/* Peso */}
        <div>
          <label className="block font-semibold">Peso (kg)</label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="range"
                  min={30}
                  max={200}
                  {...field}
                  className="w-full"
                />
                <div className="text-center">{field.value} kg</div>
              </>
            )}
          />
        </div>

        {/* Peso Objetivo */}
        <div>
          <label className="block font-semibold">Peso Objetivo (kg)</label>
          <Controller
            name="goalWeight"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="range"
                  min={30}
                  max={200}
                  {...field}
                  className="w-full"
                />
                <div className="text-center">{field.value} kg</div>
              </>
            )}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default RegisterMeasurements;