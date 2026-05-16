# Machine Learning para Mortales - Cap. 3: El Mapa del Tesoro de la IA

Ya sabemos cómo limpiar datos con Pandas y Numpy (Cap. 1), también sabemos cómo buscar patrones visuales con Matplotlib (Cap. 2). Pero antes de escribir código de entrenamiento, necesitamos entender qué es realmente el Machine Learning y qué caminos podemos tomar. 

Hoy vamos a mapear el universo del ML para saber exactamente dónde encajan las herramientas que usaremos.

<br>

### <u>¿Qué es el Machine Learning?</u>

A diferencia de la programación tradicional donde escribimos reglas (`if/else`, bucles), el Machine Learning es la ciencia de hacer que las computadoras aprendan de los datos sin ser programadas explícitamente. Es, en esencia, **construcción automática de software basada en estadística**.

<br>

---

### El Origen: Cuando la IA era pura filosofía (Años 50)
El Machine Learning nace oficialmente en 1952 de la mano de Arthur Samuel, un ingeniero de IBM que escribió un programa para jugar a las damas. El software no solo jugaba, sino que aprendía de sus propios errores en cada partida. Fue el propio Samuel quien acuñó el término "Machine Learning".
Poco después, en 1957, Frank Rosenblatt creó el Perceptrón, el ancestro directo de las redes neuronales actuales. En ese momento, el New York Times publicó que la Marina de EE.UU. estaba financiando un cerebro electrónico que "pronto aprendería a caminar, hablar, ver y escribir". El hype era total... pero la tecnología no estaba lista.

### El Primer "Invierno de la IA" (Años 70-80)
Como las computadoras de esa época tenían menos potencia que un reloj digital actual, no podían procesar la matemática que proponían los científicos. Las promesas no se cumplieron, los gobiernos quitaron el financiamiento y la disciplina entró en una era oscura conocida como el <b>"AI Winter" (El invierno de la IA)</b>. Durante décadas, hablar de redes neuronales en la universidad era casi un tabú.

### ¿Dónde empieza a tener relevancia real? (Los 3 hitos del despertar)
El Machine Learning sale del laboratorio y empieza a volverse una herramienta masiva y relevante gracias a tres factores que explotaron entre los 90 y los 2010:

1. El hito mediático: Deep Blue (1997)
IBM construyó una supercomputadora que derrotó al campeón mundial de ajedrez Garry Kasparov. Aunque usaba más fuerza bruta que ML puro, este evento le demostró al mundo que las máquinas podían superar la capacidad cognitiva humana en entornos complejos.

2. El Big Data e Internet (Años 2000)
El Machine Learning tiene un combustible único: los datos. Con la explosión de internet, Google, Facebook y Amazon empezaron a acumular miles de millones de clics, textos e imágenes. Por primera vez en la historia, los algoritmos tenían suficientes ejemplos reales para entrenarse con precisión.

3. La revolución de las GPUs (2012 - El punto de inflexión)
El verdadero "Big Bang" del ML moderno ocurrió en 2012 con AlexNet, una red neuronal que aplastó a la competencia en un concurso de reconocimiento de imágenes. ¿El secreto? Sus creadores no usaron CPUs comunes, sino tarjetas gráficas (GPUs) de Nvidia (las mismas que usás para jugar). Las GPUs resultaron ser perfectas para el álgebra lineal y el cálculo de matrices del ML, acelerando los entrenamientos mil veces.

<br>

<br>

## <u>Los 3 Tipos de Aprendizaje en ML</u>

El universo de la IA se divide principalmente en tres grandes categorías según cómo el sistema interactúa con los datos:



### 1. Aprendizaje Supervisado (Supervised Learning)
Es el más común en la industria. Aquí, el dataset viene con la **"respuesta correcta"** incluida (etiquetas o *labels*). Le mostramos al algoritmo miles de ejemplos de *"Auto con X km y Año Y = Vale Z dólares"*. El sistema aprende la relación entre las características (*features*) y el objetivo (*target*).

<br>

**¿Qué logramos realmente con esto?** A través del entrenamiento, el algoritmo calcula matemáticamente el valor óptimo de la **pendiente** (el peso <code style="background: #1e1e1e; color: #ff007f; padding: 2px 4px; border-radius: 4px; font-family: monospace;">w</code>) y la **ordenada al origen** (el sesgo <code style="background: #1e1e1e; color: #ff007f; padding: 2px 4px; border-radius: 4px; font-family: monospace;">b</code>) para nuestra función:

<p align="center" style="font-family: 'Times New Roman', serif; font-size: 1.3rem; margin: 15px 0; color: #e6edf3;">
  <i>y</i> = <b>w</b> · <i>x</i> + <b>b</b>
</p>

Y lo mejor de todo: si agregamos más variables como el año o la marca, la matemática se expande sumando más pendientes (w1·x1 + w2·x2 + ...), pero la lógica de predicción sigue siendo exactamente la misma.

### 2. Aprendizaje No Supervisado (Unsupervised Learning)
Aquí los datos **no tienen etiquetas**. No hay respuestas correctas ni un "target" que predecir. El algoritmo analiza el dataset a ciegas y busca estructuras, patrones ocultos o agrupaciones por sí mismo basándose en la similitud de los datos.

<br>

**¿Cómo funciona en la práctica?** Imagina que exportas toda la base de datos de los ciudadanos que usan la app de un sistema gubernamental. No sabes qué tipos de usuarios tienes, solo tienes sus datos: edad, trámites realizados y frecuencia de uso. Un algoritmo de **Clustering** (agrupamiento) medirá la "distancia" matemática entre los perfiles y te dirá: *"Che, descubrí que tus usuarios se dividen orgánicamente en estos 3 grupos bien diferenciados"*. 



A partir de ahí, eres tú (el humano) quien le pone nombre a esos grupos: "El ciudadano tecnológico", "El vecino que solo paga tasas" o "El usuario ocasional". El sistema no sabe qué es un vecino, solo sabe encontrar patrones de comportamiento donde el ojo humano vería un caos de filas.

<br>

---

<br>

### 3. Aprendizaje por Reforzamiento (Reinforcement Learning)
Este enfoque se sale por completo de los dos anteriores porque aquí **no dependemos de un dataset estático**. El algoritmo (llamado **agente**) aprende interactuando en tiempo real con un entorno dinámico a base de **ensayo y error**.

<br>

**El bucle de recompensas:** Para entenderlo de forma simple, es exactamente igual a cómo entrenas a un perro o cómo un dev aprende a base de prueba y error. El agente realiza una acción, el entorno cambia y el sistema le devuelve una respuesta doble: un nuevo **estado** y una **recompensa** (que puede ser un premio positivo por una buena decisión o un castigo negativo por una mala).



* **El premio:** Sumar puntos (Ej: Mantener el auto autónomo dentro del carril o ganar una pieza en el ajedrez).
* **El castigo:** Restar puntos o reiniciar la partida (Ej: Chocar contra el guardarraíl o perder el rey).

Tras millones de iteraciones (partidas simuladas a máxima velocidad), el agente optimiza su estrategia matemática para acumular la mayor cantidad de premios posibles. Es la tecnología detrás de los autos que se manejan solos, los robots de Boston Dynamics o la IA que le ganó a los campeones mundiales de videojuegos.

<br>

---

<br>

## <u>El Zoom en el Aprendizaje Supervisado</u>

Como nuestro objetivo final es predecir el valor de un auto, nos vamos a quedar a vivir en el **Aprendizaje Supervisado**. Dentro de este mundo, los problemas se dividen en dos:

* **Clasificación:** Predecir una categoría discreta (Ej: ¿Este correo es *Spam* o *No Spam*?).
* **Regresión:** Predecir un valor numérico continuo (Ej: El precio de un auto, la temperatura de mañana).

<br>

### Los Algoritmos de Regresión que dominaremos

Para resolver nuestro problema de predecir el precio del auto, existen muchísimos algoritmos (como *Decision Trees, Random Forest o Support Vector Machines*), pero nosotros nos enfocaremos en los dos pilares fundamentales:

1. **Regresión Lineal:** Asume que la relación entre los datos es una línea recta (como la fórmula <code style="background: #1e1e1e; color: #ff007f; padding: 2px 6px; border-radius: 4px; font-family: monospace;">y = w · x + b</code> que vimos en el Cap 1). Es simple, rápida y ultra eficiente.
2. **Regresión Polinómica (Polimodal):** ¿Qué pasa si los autos no bajan de precio de forma recta, sino que se devalúan de golpe los primeros dos años y luego se estabilizan? La línea recta ya no sirve; necesitamos una curva matemática. Eso es la regresión polinómica.

<br>

---

## <u>¿Qué sigue?</u>

Ahora que tenés el mapa conceptual en la cabeza y sabés que nuestro problema es de **Aprendizaje Supervisado de Regresión**, estamos listos para tirar código real.

En el **Capítulo 4**, abriremos nuestro entorno de Python e implementaremos paso a paso la **Regresión Lineal** y la **Regresión Polinómica** usando **Scikit-Learn (sklearn)**, la librería estándar de la industria.

¡Nos vemos en el próximo deploy de teoría a la práctica!
