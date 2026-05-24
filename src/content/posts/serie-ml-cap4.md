# Machine Learning para Mortales - Cap. 4: Tu primer entrenamiento con Regresión Lineal

En el capítulo anterior mapeamos el universo de la IA y descubrimos que nuestro problema (predecir el rendimiento o el valor de un auto) pertenece al **Aprendizaje Supervisado de Regresión**. 

Hoy vamos a pasar de la teoría de pizarrón al código puro. Vamos a abrir el capó de **Scikit-Learn** para entender qué hace exactamente la función matemática que entrena nuestro modelo y cómo escribir el script que calcula las predicciones.

<br>

### <u>Las herramientas de ingeniería: El nuevo paquete</u>
Hasta ahora veníamos usando Pandas, NumPy y Matplotlib. Para meter Inteligencia Artificial real en nuestro stack de desarrollo, necesitamos instalar la librería estándar de la industria: **Scikit-Learn** (que en código importamos simplemente como `sklearn`).

```bash
pip install scikit-learn
```

## 1.¿Qué hace realmente la función de Regresión Lineal?
Cuando nosotros invocamos al modelo en Python, la máquina busca trazar una línea recta ideal en medio de la nube de puntos de nuestros datos. Como vimos antes, la ecuación de esa línea es:
<p align="center" style="font-family: 'Times New Roman', serif; font-size: 1.3rem; margin: 15px 0; color: #e6edf3;">
  <i>y</i> = <b>w</b> · <i>x</i> + <b>b</b>
</p>
Donde:
<ul>
<li>y es el Target: el valor continuo que queremos averiguar (rendimiento MPG).</li>
<li>x es la Feature: nuestra variable de entrada (caballos de fuerza horsepower).</li>
<li>w (Weight/Peso): es la pendiente de la recta. Nos indica qué tanto cambia la salida por cada unidad que se incrementa la entrada.</li>
<li>b (Bias/Sesgo): es la ordenada al origen. Físicamente representa el punto de partida teórico cuando la entrada vale exactamente cero.</li>
</ul>

<br>

### ¿Y si tenemos más de una variable? (Regresión Múltiple)
En el mundo real, un auto no se devalúa solo por el kilometraje. También influye el año de fabricación, la marca o la cantidad de puertas. 

La belleza matemática de la Regresión Lineal es que escala sin problemas. Si agregamos más *Features*, la ecuación simplemente suma más "pesos" (<code style="background: #1e1e1e; color: #ff007f; padding: 2px 4px; border-radius: 4px; font-family: monospace;">w</code>) para cada variable nueva (<code style="background: #1e1e1e; color: #e6edf3; padding: 2px 4px; border-radius: 4px; font-family: monospace;">x</code>):

<p align="center" style="font-family: 'Times New Roman', serif; font-size: 1.3rem; margin: 15px 0; color: #e6edf3;">
  <i>y</i> = <b>w₁</b>·<i>x₁</i> + <b>w₂</b>·<i>x₂</i> + <b>w₃</b>·<i>x₃</i> + <b>b</b>
</p>

El modelo sigue siendo "Lineal", solo que en lugar de dibujar una línea recta en un papel 2D, calcula un plano multidimensional.

### ¿Qué pasa cuando la relación no es recta?
Si descubrimos que un auto pierde la mitad de su valor los primeros dos años, pero luego el precio se estanca, una línea recta cometería errores gigantes. Para trazar **curvas**, necesitamos elevar nuestras variables al cuadrado o al cubo (<code style="background: #1e1e1e; color: #e6edf3; padding: 2px 4px; border-radius: 4px; font-family: monospace;">x²</code>). Eso se llama **Regresión Polinómica** y es exactamente el jefe final que derrotaremos en el próximo capítulo.

### El Secreto: La Función de Costo (MCO)
¿Cómo sabe el algoritmo cuál es la mejor línea recta entre infinitas opciones posibles? Scikit-Learn usa un método matemático de optimización llamado Mínimos Cuadrados Ordinarios (MCO).

La función mide la distancia vertical entre cada punto real de nuestro dataset y la línea recta de predicción propuesta. A esa distancia la eleva al cuadrado (para evitar valores negativos y penalizar mucho más a los errores grandes) y busca la combinación exacta de w y b que logre el menor error global posible.
Dicho de forma más amena busca la menor distancia del conjunto de puntos a la linea recta, por eso son importante los pasos previos para ver relaciones entre los datos de entrada y salida.


## 2. Manos a la obra: El código de entrenamiento
Vamos a programar el flujo completo: importar los datos remotos, limpiar la columna problemática de caballos de fuerza (horsepower) tal como aprendimos en el primer capítulo, y entrenar el modelo.

```Python

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# Importamos el módulo de Regresión Lineal de Sklearn
from sklearn.linear_model import LinearRegression

# 1. Cargamos y limpiamos los datos del Cap 1
url = "https://raw.githubusercontent.com/RodolfoViana/exploratory-data-analysis-dataset-cars/master/cars_multi.csv"
df = pd.read_csv(url)

df['horsepower'] = pd.to_numeric(df['horsepower'], errors='coerce') # erros = 'coerce' pone NaN donde no se puede convertir
df = df.dropna(subset=['horsepower']) # Limpia los valores NaN

# 2. Preparamos las variables para Sklearn
# NOTA DE INGENIERÍA: Sklearn espera estrictamente que las Features (X) sean una matriz bidimensional (2D Array)
X = df[['horsepower']].to_numpy() 
y = df['mpg'].to_numpy() # Target: Millas por galón (Eficiencia)

# 3. Instanciamos y entrenamos el modelo (La magia ocurre acá)
model = LinearRegression()
model.fit(X, y) # fit() ejecuta el algoritmo de Mínimos Cuadrados Ordinarios

# 4. Extraemos la matemática calculada por la IA
peso_w = model.coef_[0]
sesgo_b = model.intercept_

print(f"--- Parámetros Optimizados ---")
print(f"Pendiente (w): {peso_w:.4f}")
print(f"Punto de origen/Bias (b): {sesgo_b:.2f}")

```

## 3. Haciendo Predicciones e Inferencia
Una vez ejecutado .fit(), el objeto model ya guardó en su memoria interna los valores estables de los coeficientes. Ahora podemos invocar el método .predict() pasándole cualquier valor nuevo para ver la inferencia del modelo en tiempo real:

```Python

# Queremos saber el consumo estimado de un auto con 150 Caballos de Fuerza (HP)
# Pasamos el dato estructurado como matriz de dos dimensiones
nuevo_auto = np.array([[150.0]])
prediccion = model.predict(nuevo_auto)

print(f"Un auto de 150 HP debería rendir aproximadamente: {prediccion[0]:.2f} MPG")

```

Recuerdan este gráfico

![Gráfico Scatter de HP vs Consumo](/assets/blogs/ml-cap2/graph1.png)

Ahora vamos a dibujar sobre el la función lineal de predicción, para que vean que se trata solamente de una función lineal

```Python

plt.scatter(df['horsepower'], df['mpg'], alpha=0.5, color='#00d4ff')
plt.plot(df['horsepower'], model.predict(X), color='red') # Línea de regresión
plt.title('Relación HP vs Consumo')
plt.xlabel('Caballos de Fuerza')
plt.ylabel('Millas por Galón')
plt.show()

```

![Línea de Regresión Lineal sobre el Scatter Plot](/assets/blogs/ml-cap4/graph1.png)

A nivel visual, lo que nuestro software ha logrado es trazar una línea de producción automatizada sobre el desorden de los datos reales que analizamos previamente:

## ¿Qué sigue?
Acabamos de entrenar nuestro primer modelo lineal funcional. La recta funciona de manera espectacular cuando los cambios en el mundo real son constantes y uniformes. Pero ¿qué pasa cuando los datos describen curvas parabólicas o comportamientos de devaluación acelerada? Si forzamos una línea recta ahí, cometeremos errores graves de estimación.

En el Capítulo 5, romperemos el molde plano e implementaremos una Regresión Polinómica (Polimodal) utilizando curvas adaptativas para resolver escenarios complejos del mundo real.

¡Nos vemos en el próximo commit de código!
