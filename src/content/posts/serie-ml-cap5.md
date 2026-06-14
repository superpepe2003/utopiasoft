# Machine Learning para Mortales - Cap. 5: Doblando las reglas con Regresión Polinómica

En el Capítulo 4 logramos que nuestra IA trazara una línea recta perfecta para predecir el rendimiento de un vehículo. Para tendencias estables, la Regresión Lineal es una herramienta imbatible. Pero, como desarrolladores, sabemos que el mundo real tiene casos de borde que rompen los moldes.

¿Qué pasa cuando un auto pierde el 30% de su valor apenas sale de la concesionaria, pero luego la devaluación se estanca durante cinco años? Si le forzamos una línea recta a ese comportamiento, vamos a predecir precios absurdos (incluso negativos). 

Hoy vamos a aprender a **doblar la recta** implementando una **Regresión Polinómica**.

<br>

---

<br>

## <u>1. El truco de magia: Sigue siendo lineal</u>

La Regresión Polinómica suena a matemática avanzada de la NASA, pero en realidad es un "hack" de ingeniería muy elegante. Scikit-Learn no tiene un algoritmo separado llamado `PolynomialRegression`. Lo que hacemos es transformar nuestros datos de entrada *antes* de pasárselos al modelo lineal.

Si nuestra variable de entrada (<code style="background: #1e1e1e; color: #e6edf3; padding: 2px 4px; border-radius: 4px; font-family: monospace;">x</code>) son los kilómetros, lo que hacemos es crear artificialmente nuevas columnas elevando esa variable al cuadrado (<code style="background: #1e1e1e; color: #e6edf3; padding: 2px 4px; border-radius: 4px; font-family: monospace;">x²</code>) o al cubo (<code style="background: #1e1e1e; color: #e6edf3; padding: 2px 4px; border-radius: 4px; font-family: monospace;">x³</code>).

La ecuación matemática pasa de ser una simple recta a una curva de grado 2 (parábola):

<p align="center" style="font-family: 'Times New Roman', serif; font-size: 1.4rem; margin: 20px 0; color: #e6edf3;">
  <i>y</i> = <span style="color: #ff007f; font-weight: bold;">w₁</span>·<i>x</i> + <span style="color: #ff007f; font-weight: bold;">w₂</span>·<i>x²</i> + <span style="color: #00d4ff; font-weight: bold;">b</span>
</p>

El algoritmo de Regresión Lineal del Capítulo 4 mira esto y dice: *"¡Ah! Tengo dos variables distintas, calcularé un plano"*. El modelo no sabe que <code style="background: #1e1e1e; color: #e6edf3; padding: 2px 4px; border-radius: 4px; font-family: monospace;">x²</code> es la misma variable original mutada. Al graficar el resultado final contra la variable original, la magia ocurre: **el plano se proyecta como una curva**.

<br>

---

<br>

## <u>2. Manos al código: Implementando Curvas</u>

Para transformar los datos al vuelo, vamos a usar una herramienta nueva de `sklearn` llamada `PolynomialFeatures`. 

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

# 1. Simulamos datos de devaluación compleja (No lineales)
np.random.seed(42)
kilometros = np.random.uniform(0, 200, 100) # De 0 a 200 mil km
kilometros = np.sort(kilometros)

# El precio cae fuerte al principio y luego se estabiliza (comportamiento curvo)
precio_real = 30000 - 1500 * kilometros + 5 * (kilometros ** 2) + np.random.normal(0, 5000, 100)

# Damos formato de matriz 2D para Sklearn
X = kilometros.reshape(-1, 1)
y = precio_real

# 2. El Transformador Polinómico (El Hack)
# Le decimos que queremos curvar hasta el Grado 2 (x²)
poly_converter = PolynomialFeatures(degree=2, include_bias=False)

# Transformamos nuestros kilómetros planos en una matriz con [km, km²]
X_poly = poly_converter.fit_transform(X)

# 3. Entrenamos el mismo Modelo Lineal de siempre, pero con datos mutados
model = LinearRegression()
model.fit(X_poly, y)

# 4. Generamos las predicciones
precio_predicho = model.predict(X_poly)

print(f"Pendiente x (w1): {model.coef_[0]:.2f}")
print(f"Pendiente x² (w2): {model.coef_[1]:.2f}")

```

Si graficamos esto con Matplotlib, vamos a ver cómo nuestro modelo ahora "abraza" la caída pronunciada del precio sin irse a números negativos.

```python
plt.style.use('dark_background')
plt.scatter(kilometros, precio_real, color='#00d4ff', alpha=0.5, label='Datos Reales')
plt.plot(kilometros, precio_predicho, color='#ff007f', linewidth=3, label='Regresión Polinómica (Grado 2)')

plt.title('Devaluación: Precio vs Kilómetros')
plt.xlabel('Miles de Kilómetros')
plt.ylabel('Precio (USD)')
plt.legend()

# Guardamos el gráfico para el blog
plt.savefig('src/assets/img/blog/cap5-polinomica.png', transparent=True, bbox_inches='tight', dpi=300)
plt.show()

```

![Gráfico Curva KM y Precio](/assets/blogs/ml-cap5/graph1.png)

## 3. La trampa del Head of Systems: El Overfitting
Como desarrolladores, cuando vemos que el Grado 2 ajusta mejor que una recta, la tentación inmediata es: "¡Le pongo Grado 50 y que el modelo pase por todos y cada uno de los puntos!".

Eso en Machine Learning es un error letal llamado Sobreajuste (Overfitting).

Si obligas a la curva a tocar todos los puntos del dataset, el modelo no está "aprendiendo" el patrón general; está memorizando el ruido y los errores de carga. Cuando pongas ese modelo en producción y le pases el dato de un vehículo nuevo, la curva hará un pico absurdo y predecirá cualquier disparate.

Regla de oro: Buscamos el modelo más simple que explique bien los datos. Un Grado 2 o 3 suele ser suficiente para problemas físicos y económicos reales. Más complejidad no significa más inteligencia.

## ¿Qué sigue?
Hasta acá resolvimos problemas donde la respuesta es un número continuo (precios, consumos). Pero ¿qué pasa si lo que queremos predecir no es un número, sino una decisión?

Imaginemos que estamos desarrollando el backend de una app de solicitudes crediticias y necesitamos que la IA apruebe o rechace automáticamente una solicitud de trámite en base al historial del cliente. La salida ya no es un precio; es un simple Sí o No (1 o 0).

En el Capítulo 6, daremos un giro radical para adentrarnos en los problemas de Clasificación y dominar la Regresión Logística, el motor detrás de la toma de decisiones binarias.

¡Nos vemos en el próximo deploy!
