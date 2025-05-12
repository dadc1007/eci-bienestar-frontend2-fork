
import coliseoImg from "@modules/sports-equipment/Images-sport-equipment/coliseo.jpg";
import detalleImg from "@modules/sports-equipment/Images-sport-equipment/equipment.jpg";

const Home = () => {
    return (
        <>
            <section className="p-10 bg-white rounded shadow mx-4 my-1">
                <img src={coliseoImg}
                     alt="Coliseo"
                     className="w-full h-72 object-cover rounded mb-6"
                />
                <h2
                    className="text-3xl font-bold mb-6 text-green-800">Bienvenido al servicio de
                </h2>
                <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                    {/* Texto a la izquierda */}
                    <div className="md:w-2/3">
                        <p className="text-gray-800 mb-6 leading-relaxed">
                            Este apartado permite a los miembros de la comunidad reservar y
                            acceder al préstamo de equipos deportivos en el coliseo, facilita
                            tanto la solicitud como la devolución de los elementos. A su vez,
                            los funcionarios de bienestar gestionan la disponibilidad del
                            inventario y verifican el estado de los equipos al momento de la
                            devolución, garantizando así un uso adecuado de los recursos
                            institucionales.
                        </p>
                        <p className="text-gray-600 italic mb-2">
                            ¡En la parte de arriba de la página encontrarás las opciones para la
                            gestión de artículos!
                        </p>
                        <p className="text-gray-700">
                            Conoce más sobre todo lo que ofrece el campus en:{" "}
                            <a
                                href="https://www.escuelaing.edu.co/es/campus/coliseo-el-otono/"
                                className="text-blue-600 underline"
                                target="_blank"
                            >
                                https://www.escuelaing.edu.co/es/campus/coliseo-el-otono/
                            </a>
                        </p>
                    </div>

                    <div className="md:w-1/3 mt-4 md:mt-0">
                        <img
                            src={detalleImg}
                            alt="Detalle del coliseo"
                            className="w-full h-48 object-cover rounded"
                        />
                    </div>
                </div>
            </section>
            <footer className="bg-[#5B1F00] text-white text-xs text-center py-3 mt-6">
                Todos los derechos reservados ©2022 - Escuela Colombiana de Ingeniería Julio Garavito. Personería Jurídica 086 de enero 19 de 1973.
                Renovación de la Acreditación Institucional en Alta Calidad. Resolución N.° 000195 del 16 de enero de 2025 (vigencia de 8 años).
                Vigilada por Mineducación.
            </footer>
        </>
    );
};

export default Home;
