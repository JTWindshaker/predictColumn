import axios from 'axios';

// Función para hacer la predicción
export const getPrediction = async (ip, sliders) => {
    try {
        const response = await axios.post(`http://${ip}:8080/predict`, {
            incidencia_pelvica: sliders.incidenciaPelvica,
            inclinacion_pelvica: sliders.inclinacionPelvica,
            angulo_lordosis_lumbar: sliders.anguloLordosisLumbar,
            pendiente_sacra: sliders.pendienteSacra,
            radio_pelvico: sliders.radioPelvico,
            grado_espondilolistesis: sliders.gradoEspondilolistesis,
        }, {
            headers: {
                'Content-Type': 'application/json', // Especifica que el contenido es JSON
            },
        });
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error("Error en la predicción: ", error);
        throw error; // Si hay error, lo lanzamos para manejarlo en la vista
    }
};
