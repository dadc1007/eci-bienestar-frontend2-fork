import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// Schema de validación Yup
const schema = yup.object().shape({
  goal: yup.string().required("El objetivo es obligatorio"),
  registrationDate: yup
    .string()
    .required("La fecha de registro es obligatoria")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  weight: yup
    .number()
    .typeError("Peso inválido")
    .positive("Peso debe ser positivo")
    .required("Peso obligatorio"),
  height: yup
    .number()
    .typeError("Altura inválida")
    .positive("Altura debe ser positiva")
    .required("Altura obligatoria"),
  waists: yup
    .number()
    .typeError("Cintura inválida")
    .positive("Cintura debe ser positiva")
    .required("Cintura obligatoria"),
  chest: yup
    .number()
    .typeError("Pecho inválido")
    .positive("Pecho debe ser positivo")
    .required("Pecho obligatorio"),
  rightarm: yup
    .number()
    .typeError("Brazo derecho inválido")
    .positive("Debe ser positivo")
    .required("Brazo derecho obligatorio"),
  leftarm: yup
    .number()
    .typeError("Brazo izquierdo inválido")
    .positive("Debe ser positivo")
    .required("Brazo izquierdo obligatorio"),
  rightleg: yup
    .number()
    .typeError("Pierna derecha inválida")
    .positive("Debe ser positiva")
    .required("Pierna derecha obligatoria"),
  leftleg: yup
    .number()
    .typeError("Pierna izquierda inválida")
    .positive("Debe ser positiva")
    .required("Pierna izquierda obligatoria"),
});

// Tipo de datos del formulario
interface FormData {
  goal: string;
  registrationDate: string; // YYYY-MM-DD
  weight: number;
  height: number;
  waists: number;
  chest: number;
  rightarm: number;
  leftarm: number;
  rightleg: number;
  leftleg: number;
}

const RegisterProgressPages = () => {
  // Simular datos del último registro (podrían venir de API)
  const [lastRecord, setLastRecord] = useState<FormData | null>(null);

  // Inicializar react-hook-form
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      goal: "",
      registrationDate: "",
      weight: 0,
      waists: 0,
      chest: 0,
      rightarm: 0,
      leftarm: 0,
      rightleg: 0,
      leftleg: 0,
    },
  });

  useEffect(() => {
    // Aquí iría la lógica para obtener el último registro desde API/almacenamiento
    // Simulación:
    const simulatedLastRecord: FormData = {
      goal: "Perder peso",
      registrationDate: "2025-05-20",
      weight: 75.5,
      height: 170,
      waists: 85,
      chest: 95,
      rightarm: 32,
      leftarm: 31.5,
      rightleg: 55,
      leftleg: 54.5,
    };
    setLastRecord(simulatedLastRecord);
    // También opcionalmente cargar esos datos como valores iniciales en el formulario:
    reset(simulatedLastRecord);
  }, [reset]);

  const onSubmit = (data: FormData) => {
    alert("Progreso registrado correctamente");
    console.log("Datos enviados:", data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold bg-black text-white py-2 px-4 rounded">
        Registro de Progreso
      </h1>

      {lastRecord && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">Último registro</h2>
          <ul className="text-sm space-y-1">
            <li><strong>Objetivo:</strong> {lastRecord.goal}</li>
            <li><strong>Fecha de registro:</strong> {lastRecord.registrationDate}</li>
            <li><strong>Peso:</strong> {lastRecord.weight} kg</li>
            <li><strong>Altura:</strong> {lastRecord.height} cm</li>
            <li><strong>Cintura:</strong> {lastRecord.waists} cm</li>
            <li><strong>Pecho:</strong> {lastRecord.chest} cm</li>
            <li><strong>Brazo derecho:</strong> {lastRecord.rightarm} cm</li>
            <li><strong>Brazo izquierdo:</strong> {lastRecord.leftarm} cm</li>
            <li><strong>Pierna derecha:</strong> {lastRecord.rightleg} cm</li>
            <li><strong>Pierna izquierda:</strong> {lastRecord.leftleg} cm</li>
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Objetivo */}
        <div>
          <label className="block font-semibold">
            Objetivo<span className="text-red-500">*</span>
          </label>
          <Controller
            name="goal"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                placeholder="Ejemplo: Perder peso, ganar músculo..."
                className={`w-full border p-2 rounded ${
                  errors.goal ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.goal && (
            <p className="text-red-500 text-sm mt-1">{errors.goal.message}</p>
          )}
        </div>

        {/* Fecha de registro */}
        <div>
          <label className="block font-semibold">
            Fecha de registro<span className="text-red-500">*</span>
          </label>
          <Controller
            name="registrationDate"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className={`w-full border p-2 rounded ${
                  errors.registrationDate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.registrationDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationDate.message}
            </p>
          )}
        </div>

        {/* Campos numéricos */}
        {[
          { name: "weight", label: "Peso (kg)" },
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
                <input
                  type="number"
                  step="0.1"
                  {...field}
                  className={`w-full border p-2 rounded ${
                    errors[name as keyof FormData] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors[name as keyof FormData] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Guardar Progreso
        </button>
      </form>
    </div>
  );
};

export default RegisterProgressPages;