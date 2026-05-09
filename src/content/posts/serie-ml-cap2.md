# Machine Learning para Mortales - Cap. 2: Visualizando el camino con Matplotlib

En el capítulo anterior aprendimos a limpiar nuestros datos con el "Dúo Dinámico" (Pandas & NumPy). Pero ver miles de filas en una tabla no es suficiente para entender la realidad. Hoy vamos a aprender a graficar esos datos para tomar decisiones inteligentes.

<br>

### <u>¿Qué es Matplotlib?</u>
Es la librería abuela de la visualización en Python. Es extremadamente potente y nos permite crear desde gráficos simples hasta visualizaciones complejas de grado científico. Como desarrolladores, nos sirve para validar hipótesis antes de escribir una sola línea de código de entrenamiento, otras librerias más modernas como Seaborn están construidas sobre Matplotlib.

**Instalación:**
```bash
pip install matplotlib

```

---

## 1. Gráficos de Relación (Scatter Plot)

El **Scatter Plot** (gráfico de dispersión) es vital en ML. Nos permite ver si existe una correlación entre dos variables, es un gráfico de relación entre 2 variables. Por ejemplo: *¿A más caballos de fuerza (HP), mayor es el consumo de combustible?*

```python
  import matplotlib.pyplot as plt
  import pandas as pd

  plt.style.use('dark_background')

  url = "https://raw.githubusercontent.com/RodolfoViana/exploratory-data-analysis-dataset-cars/master/cars_multi.csv"

  df = pd.read_csv(url)

  # Limpiar valores no numéricos en horsepower
  df['horsepower'] = pd.to_numeric(df['horsepower'], errors='coerce') # erros = 'coerce' pone NaN donde no se puede convertir
  df = df.dropna(subset=['horsepower']) # Limpia los valores NaN

  plt.scatter(df['horsepower'], df['mpg'], alpha=0.5, color='#00d4ff')
  plt.title('Relación HP vs Consumo')
  plt.xlabel('Caballos de Fuerza')
  plt.ylabel('Millas por Galón')
  plt.show()

```

![Logo Utopia Soft](/assets/blogs/ml-cap2/graph1.png)

## 2. Gráficos de Distribución (Histogramas)

Un **Histograma** nos ayuda a entender cómo están distribuidos nuestros datos. Es ideal para detectar si nuestra muestra es equilibrada o si tenemos "agujeros" de información, es ideal para analizar como se mueve una variable, como en este caso analizamos la variable Modelo, donde hay más concentración, el bins marca la cantidad de grupos que armo, en este caso 10.

```python
  # Distribución de la antigüedad de los autos
  plt.hist(df['model_year'], bins=10, color='#00ff88', edgecolor='black')
  plt.title('Distribución por Año de Modelo')
  plt.xlabel('Año')
  plt.ylabel('Cantidad de Vehículos')
  plt.show()

```
![Logo Utopia Soft](/assets/blogs/ml-cap2/graph2.png)

## 3. Gráficos de Categorización (Bar Chart)

Cuando queremos comparar categorías (ej: cuántos autos hay por cada país de origen), el **Gráfico de Barras** es el rey indiscutido, aca no medimos frecuencia continua como en el histograma, sino la frecuencia sobre una categoría.

```python
  # Conteo de autos por origen (usando Pandas + Matplotlib)
  df['origin'].value_counts().plot(kind='bar', color=['#ff4444', '#4444ff', '#ffaa00'])
  plt.title('Cantidad de Autos por Origen')
  plt.xticks(rotation=0) 
  plt.show()

```
![Logo Utopia Soft](/assets/blogs/ml-cap2/graph3.png)
---

## ¿Cómo leer estos gráficos como un Dev?

Como **Head of Systems**, no buscás que el gráfico sea "lindo", buscás que sea **útil**:

* **En el Scatter:** Si ves puntos muy alejados de la tendencia, encontraste **Outliers** (datos ruidosos) que hay que limpiar.


* **En el Histograma:** Si todos los datos están amontonados de un lado, tu modelo estará sesgado y no aprenderá bien sobre el resto.


* **En las Barras:** Te ayuda a ver si tenés suficientes ejemplos de cada categoría para que la IA aprenda de forma pareja.



---

## ¿Qué sigue?

Ya sabemos limpiar datos (Cap. 1) y visualizarlos (Cap. 2). En el **Capítulo 3**, daremos el gran salto: Usaremos **Scikit-Learn** para entrenar nuestra primera Regresión Lineal y predecir valores reales.

¡Preparen sus motores, que empieza lo bueno!

