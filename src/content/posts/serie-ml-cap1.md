# Machine Learning para Mortales - Cap. 1: El Arte de Limpiar Datos con Pandas y NumPy

Debido a la gran repercusión del artículo anterior sobre Machine Learning para Mortales, donde vimos cómo integrar un modelo pre-entrenado en nuestro stack de **Angular y NestJS**, hoy empezamos una serie dedicada a lo que sucede "detrás de escena.".

En esta serie no pretendo enseñar Python desde cero (quizás lo hagamos en una serie futura), sino darte las herramientas de **Data Engineering** necesarias para que vos mismo puedas entrenar tus modelos. 

<br>

### <u>¿Por qué Python? (Pandas y Numpy)</u>
En el mundo del software tradicional usamos arrays y objetos. En el mundo de los datos, necesitamos estructuras que soporten millones de registros sin que la memoria RAM pida auxilio. Ahí es donde entra **Pandas**, la librería de oro para manipular datos. **Pandas** hace fácil lo difícil, esta librería nos permite manipular y analizar datos estructurados basandose en sus dos pilares DataFrame y Series, acompañado de la mano por **NumPy** una librería especializada en el manejo de Array, Matrices y Funciones numéricas para trabajar con todos ellos.

<br>

### <u>El cimiento de todo: NumPy</u>
Antes de hablar de tablas, tenemos que hablar de **NumPy**. Es la librería que permite que Python sea rápido para las matemáticas. Mientras que una lista común de Python es flexible pero lenta, los **NumPy Arrays** son bloques de memoria contiguos, ideales para el álgebra lineal que requiere el ML.

<br>

---

<br>

## 1. Series, DataFrames y Arrays

Para un dev, el mapa mental es este:
*   **NumPy Array:** Es como un Array de C o un TypedArray en JS. Pura eficiencia matemática.
*   **Pandas Series:** Un array de NumPy con "superpoderes" (índices y etiquetas).
*   **Pandas DataFrame:** Un conjunto de Series (como una tabla de SQL o un JSON estructurado).



<br>

## 2. ¿Por qué limpiar datos? (Data Cleaning)

Si a nuestro modelo de predicción de autos le pasamos un kilometraje que dice "Desconocido" (String) en lugar de un número, el sistema va a fallar. Limpiar datos es:
1.  **Tipado:** Asegurarnos de que los números sean `float64` o `int64`.
2.  **Valores Faltantes:** Decidir si borramos la fila o inventamos un valor (imputación) cuando falta el precio.
3.  **Unificación:** Que todas las marcas estén en minúsculas.

<br>

---

<br>

## 3. Código en acción: Cargando un Dataset real

Vamos a usar un dataset de vehículos real para que puedas seguir el ejemplo. 

> **Nota de Dev:** Usamos la URL "raw" de GitHub para que Pandas reciba el texto plano del CSV y no el HTML de la página.
```python
  import pandas as pd
  import numpy as np

  # URL de datos de autos (Cars Dataset)
  url = "https://raw.githubusercontent.com/RodolfoViana/exploratory-data-analysis-dataset-cars/master/cars_multi.csv"

  # Cargamos el DataFrame
  df = pd.read_csv(url)

  # Vemos las primeras filas y la estructura
  print(df.head())
  print(df.info())
  # Vemos ciertos datos estadisticos
  print(df.describe())

```

## 4. Manipulación básica con NumPy y Pandas
Podemos usar NumPy para realizar operaciones rápidas sobre columnas enteras. Por ejemplo, si queremos calcular el promedio de caballos de fuerza el campos "horsepower"

```python

  # 1. Valores Faltantes: 
  # En Pandas, podemos llenar los nulos (NaN) con 0 o con el promedio.
  # Vamos a usar NumPy para identificar y Pandas para llenar.
  # También se podría haber realizado con Pandas df['horsepower'].fillna(0)
  df['horsepower'] = df['horsepower'].replace(np.nan, 0)

  # 2. Tipado (Casting):
  # A veces los datos vienen como 'object' (strings) por errores en el CSV.
  # Nos aseguramos de que sean float64 para que NumPy pueda operar.
  df['horsepower'] = df['horsepower'].astype('float64')

  # Convertimos una Serie de Pandas a un Array de NumPy si necesitamos velocidad
  hp_array = df['horsepower'].to_numpy()

  # Usamos NumPy para estadísticas rápidas
  promedio_hp = np.mean(hp_array)
  print(f"El promedio de HP es: {promedio_hp}")

  # Limpiamos: ponemos todas las marcas en minúsculas
  df['car_name'] = df['car_name'].str.lower()

  # También podemos usar Pandas para crear filtros complejos
  # Ejemplo: Filtramos autos que tienen más HP que el promedio. Este filtrado por corchetes se llama Boolean Indexing
  autos_potentes = df[df['horsepower'] > promedio_hp]

```

Agrego un ejemplo de como convertir un Diccionario Python en un DataFrame de Pandas

```python
  import pandas as pd
  import numpy as np

  # 1. Estructura familiar: Una lista de diccionarios (lo que recibirías de un API)
  datos_usuarios = [
      {"nombre": "Juan", "edad": 35, "puntaje": 95.5},
      {"nombre": "Pedro", "edad": 32, "puntaje": np.nan}, # Usamos NumPy para el valor nulo
      {"nombre": "Hijo", "edad": 10, "puntaje": 88.0}
  ]

  # 2. Convertimos a DataFrame
  df_usuarios = pd.DataFrame(datos_usuarios)
  mayores = df_usuarios[df_usuarios['edad']> 18]

  print(f"Tenemos {len(mayores)} personas mayores de edad")

```

Qué sigue, luego de este breve artículo que pretende ser una guia para que tú como entusiasta investigues, pruebes, y apliques, continuaremos
en la próxima sección con Matplotlib, una manera fácil y elegante de graficar tus datos.
