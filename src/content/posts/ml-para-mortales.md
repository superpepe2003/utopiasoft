# Machine Learning para Mortales

El Machine Learning (ML) representa un cambio de paradigma en la toma de decisiones y el manejo de la información.  
<br>

### <u>El cambio de enfoque</u>
Normalmente, el software tradicional trabaja sobre entradas de datos que procesamos mediante reglas que nosotros mismos escribimos (programación imperativa) para obtener un resultado. 

El Machine Learning pone el mundo de cabeza: ahora tenemos una enorme cantidad de **resultados** históricos y se los enviamos al software. Es el algoritmo, basado en técnicas de álgebra lineal y estadística, quien nos dice qué proceso o patrón generó esos resultados. 

> **En resumen:** El Machine Learning entrenado con datos históricos se vuelve una herramienta **predictiva**. No programamos la solución, entrenamos al sistema para que la encuentre.
<br>
---
<br>

## ¿De dónde sale el "cerebro" del modelo?

Esta es la parte que suele asustar. Entrenar es el proceso de pasarle miles de datos (ej: kilómetros, año y marca de autos vendidos) a un algoritmo para que él mismo ajuste sus parámetros matemáticos.
<br>
## La Matemática detrás: La Función Lineal
Al final del día, el entrenamiento nos entrega una función matemática. En su forma más simple, es una **ecuación lineal**:

<p align="center">
  <b>y = w · x + b</b>
</p>



* **y (Predicción):** El precio que queremos conocer.
* **x (Feature):** El dato que conocemos (ej: los kilómetros).
* **w (Peso/Weight):** Lo que el sistema aprendió que "pesa" cada kilómetro en el precio.
* **b (Sesgo/Bias):** El punto de partida (el valor base del auto aunque tenga 0 km).

Mediante un proceso llamado **Descenso de Gradiente**, el sistema calcula hacia qué dirección debe ajustar **w** y **b** para que el error sea el más bajo posible. Es un ciclo de prueba y error a gran escala: el modelo propone un resultado, mide qué tan lejos estuvo de la realidad y "vuelve atrás" para recalibrarse.



---

## ¿Cómo se integra esto en nuestro stack? (Angular + NestJS)

Para que el ML no sea una "caja negra" inalcanzable, vamos a dividir las tareas. El secreto no está en el algoritmo, sino en el **Pipeline de Datos**.

### 1. El Backend (NestJS): El "Traductor" y Ejecutor
El modelo no vive en el cliente por seguridad y performance. NestJS recibe los datos, los normaliza y le pide al modelo una predicción. Usaremos **inferencia** (usar el modelo), no entrenamiento.

**Punto clave: Inferencia vs Entrenamiento**

No vamos a entrenar el modelo en el servidor (eso consume mucha CPU/GPU). Vamos a usar un modelo ya entrenado (formato `.onnx` o `.json`) y hacer **inferencia** (usarlo).

```typescript
// En NestJS: service/predict.service.ts
async predict(data: CarDto) {
  // 1. Normalización: El modelo trabaja mejor con valores entre 0 y 1
  // Dividimos los KM por un valor máximo de referencia (ej: 200.000km)
  const inputVector = [
    data.km / 200000, 
    data.antiguedad / 20,
    data.marcaId // Pre-procesado como valor numérico
  ];

  // 2. Ejecución: Usamos onnxruntime-node para correr la fórmula matemática
  const prediction = await this.model.run(inputVector);
  
  // Retornamos el precio estimado
  return { price: prediction[0] };
}
```

### 2. El Frontend (Angular): UX Reactiva con Signals
En Angular, nuestra misión es capturar las features y enviarlas al servicio. Usaremos Signals para manejar el estado de la predicción, permitiendo que la UI de Utopia Soft sea extremadamente fluida.

```typescript
// En Angular: pages/predict/predict.component.ts
export class PredictComponent {
  private api = inject(ApiService);
  
  // Estado reactivo para la UI
  prediction = signal<number | null>(null);
  isCalculating = signal(false);

  async onCheck() {
    this.isCalculating.set(true);
    
    // Enviamos los datos (Features) al backend
    // Ejemplo: { km: 50000, año: 2022, marca: 1 }
    const res = await this.api.postPredict(this.form.value);
    
    this.prediction.set(res.price);
    this.isCalculating.set(false);
  }
}
```
### Conclusión
No necesitás ser un experto en Python para integrar IA. Si tenés un archivo .onnx exportado, tu trabajo como desarrollador Fullstack es construir el puente: un Backend sólido que traduzca datos y un Frontend que haga la experiencia fluida.


