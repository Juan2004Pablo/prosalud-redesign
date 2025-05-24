
# Verificación de Pagos - ProSalud

## Descripción del Servicio
Este formulario permite a los afiliados solicitar la verificación de pagos o novedades relacionadas con sus compensaciones, seguridad social u otros aspectos financieros vinculados a su contrato sindical.

**Enlace al formulario en el sitio web:** [`/verificacion-pagos`](/verificacion-pagos)

## Información Importante
- Este canal es para verificar pagos, novedades o aclarar dudas financieras.
- La consulta será remitida al área encargada.
- Tiempo estimado de respuesta: Hasta 15 días hábiles para la revisión del caso.
- Es importante revisar la sección "Información Importante" en la página para detalles sobre el proceso y recomendaciones para el envío de correos.

## Datos del Formulario

### Datos Personales del Solicitante
- **Tipo de identificación:** (Obligatorio) Selección entre:
    - Cédula de Ciudadanía (CC)
    - Cédula de Extranjería (CE)
    - Tarjeta de Identidad (TI)
    - Pasaporte (PP)
    - Permiso por protección temporal (PT)
- **Número de identificación:** (Obligatorio) Mínimo 5 dígitos, solo números.
- **Nombres:** (Obligatorio) Mínimo 2 caracteres.
- **Apellidos:** (Obligatorio) Mínimo 2 caracteres.
- **Correo electrónico:** (Obligatorio) Formato de correo válido.
- **Número de celular:** (Obligatorio) Mínimo 7 dígitos, solo números.

### Información del Proceso
- **Proceso:** (Obligatorio) Cargo o área del solicitante.
- **Donde realiza el proceso:** (Obligatorio) Ubicación donde labora.
- **Mes y Año de la novedad:** (Obligatorio) Periodo al que corresponde la consulta.
- **Su solicitud está relacionada con:** (Obligatorio) Motivo principal de la consulta (ej: pago de compensación, seguridad social, etc.).

### Detalle de la Novedad
- **Detalle de la novedad:** (Obligatorio) Descripción clara y concisa de la consulta o inconsistencia. Mínimo 10 caracteres, máximo 800.

### Archivo Anexo (Opcional)
- **Archivo Anexo:** (Opcional) Archivo adjunto que soporte la consulta.
    - Tipos permitidos: PDF, Excel (xls, xlsx), Imágenes (jpg, jpeg, png, gif, webp).
    - Tamaño máximo: Generalmente 4MB (verificar `MAX_FILE_SIZE`).

### Confirmación de Envío
- **Confirmación de envío:** (Obligatorio) Casilla de verificación. En la página actual, este campo está como `confirmacionEnvio` en el schema Zod, y la página usa un componente `ConfirmacionCorreoSection`. Se asume que es una confirmación de que la información es correcta y se autoriza el envío, o una confirmación para la recepción de correos. Es importante verificar el texto exacto en la página.

### Autorización de Tratamiento de Datos
- Incluye una sección estándar para la autorización del tratamiento de datos personales.

## Preguntas Frecuentes (FAQ)

**P: ¿Cuánto tiempo tardan en responder mi solicitud de verificación?**
R: El tiempo estimado es de hasta 15 días hábiles para la revisión de su caso.

**P: ¿Puedo adjuntar archivos a mi solicitud?**
R: Sí, puede adjuntar un archivo (PDF, Excel, imagen) de forma opcional para soportar su consulta.

**P: ¿Qué tipo de consultas puedo realizar a través de este formulario?**
R: Puede realizar consultas sobre pagos de compensaciones, novedades en seguridad social, o cualquier otra duda financiera relacionada con su contrato sindical.

