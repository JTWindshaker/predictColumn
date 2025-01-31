# Predict Column

**Predict Column** es una aplicación multiplataforma desarrollada en **React Native** utilizando **Expo**, diseñada para proporcionar una herramienta de predicción y evaluación del estado de la columna vertebral a partir de datos específicos introducidos por los usuarios. Mediante un modelo de árbol de decisión implementado en Python, la app permite ingresar diversos parámetros relacionados con la salud de la columna (como inclinación pélvica, ángulo de lordosis, grado de espondilolistesis, entre otros) y genera una predicción sobre posibles problemas de salud, ofreciendo recomendaciones personalizadas basadas en los resultados obtenidos. Además, la app cuenta con una interfaz fácil de usar para gestionar estos datos y realizar un seguimiento continuo del estado de salud de los usuarios.

---

## 🚀 Características principales

- **Predicción del estado de la columna vertebral:** La app utiliza un modelo de árbol de decisión para analizar los datos introducidos por el usuario y generar una predicción sobre la posible presencia de problemas de columna.
- **Ingreso personalizado de parámetros:** Los usuarios pueden ingresar datos como la inclinación pélvica, ángulo de lordosis lumbar, grado de espondilolistesis, entre otros, para obtener resultados más precisos y personalizados.
- **Interfaz intuitiva y amigable:** Un diseño simple y claro que permite a los usuarios navegar de forma rápida y eficaz, ideal para profesionales de la salud y personas que deseen monitorear su estado físico.
- **Compatibilidad multiplataforma:** Funciona en dispositivos Android e iOS, ofreciendo la misma experiencia en ambos sistemas operativos gracias a la flexibilidad de React Native.
- **Almacenamiento local de IP del servidor:** Guarda y gestiona la dirección IP del servidor de predicción para un acceso rápido sin tener que ingresarla cada vez.
- **Reiniciar fácilmente los datos:** Los usuarios pueden restablecer los valores de los sliders para comenzar nuevamente las mediciones sin perder configuraciones importantes.
- **Notificaciones claras y precisas:** Recibe alertas detalladas sobre los resultados de la predicción, con recomendaciones basadas en los datos introducidos.
- **Conexión eficiente con el modelo en Python:** La aplicación se comunica con un modelo de predicción basado en un árbol de decisión en Python, asegurando resultados rápidos y precisos en función de los parámetros proporcionados.
- **Personalización de datos:** El usuario puede ajustar los valores a medida que obtiene más información sobre su salud y seguimiento de la columna.
- **Diseño optimizado para dispositivos móviles:** Visualización adaptada para tamaños de pantalla pequeños, asegurando que la experiencia sea fluida tanto en smartphones como en tablets.

---

## 🛠️ Tecnologías utilizadas

- **[React Native](https://reactnative.dev/)**: Framework para el desarrollo de aplicaciones móviles.
- **[Expo](https://expo.dev/)**: Herramienta para acelerar el desarrollo y la implementación.

---

## 📝 Uso de la aplicación

1. **Ingreso de la dirección IP del servidor:** Al iniciar la aplicación, se solicita que ingreses la dirección IP del servidor que gestionará las predicciones. Esta IP puede ser guardada para futuros accesos rápidos.
2. **Ajuste de los parámetros de la columna:** Utiliza los controles deslizantes (sliders) para ingresar los valores relevantes para la predicción. Estos parámetros incluyen:
- Inclinación pélvica
- Ángulo de lordosis lumbar
- Grado de espondilolistesis
- Y más...
3. **Revisión de los datos ingresados:** A medida que ajustas los sliders, los valores se actualizan en tiempo real, lo que te permite revisar los datos antes de enviar la solicitud de predicción.
4. **Envío de la predicción:** Una vez que todos los valores han sido ajustados, toca el botón "Predecir" para enviar los datos al servidor y recibir una predicción sobre el estado de tu columna vertebral.
5. **Visualización de resultados:** Recibirás una alerta con la predicción:
- **Si la predicción es positiva:** El sistema indicará que existen posibles problemas de columna y sugerirá realizar un seguimiento médico.
- **Si la predicción es negativa:** El sistema confirmará que todo está dentro de los parámetros normales.
6. **Reinicio de los valores:** Después de recibir los resultados, puedes restablecer los valores de los sliders para realizar nuevas mediciones o ajustes, o bien cambiar la IP del servidor si es necesario.
7. **Salir de la aplicación:** Cuando termines de utilizar la aplicación, puedes cerrar la sesión o simplemente salir, sabiendo que tu IP guardada quedará disponible para futuras sesiones.

---

📌 *Desarrollado por José Toloza/ChatGPT* 🚀
