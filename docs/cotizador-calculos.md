# Cotizador U Rent It — Lógica de Cálculo Detallada

> Documento de referencia técnica. Describe paso a paso cada fórmula del cotizador.  
> Archivos fuente: `lib/cotizador/variables.ts`, `lib/cotizador/engine.ts`, `lib/cotizador/calculators/*.ts`

---

## 1. Constantes globales (`variables.ts`)

| Constante | Valor | Descripción |
|---|---|---|
| `TASARENTING` | 28 % | Tasa anual estándar (plazos 24 m y 36 m) |
| `TASARENTING2` | 27 % | Tasa anual estándar (plazo 48 m) |
| `TASARENTING3` | 26 % | Tasa anual plazo 60 m (Carga y Carga Pesada) |
| `TASARENTINGVIP` | 26 % | Tasa anual VIP (36 m) |
| `TASARENTINGVIP2` | 25 % | Tasa anual VIP (48 m) |

> **Tasas configurables por administradores.** Las cuatro tasas anteriores son los
> valores *por defecto*. Un admin puede capturar una tasa personalizada por
> cotizador y plazo en `/cotizador/tasas` (tabla `RateSetting` en BD); esa tasa
> aplica a todos los usuarios. Si no hay tasa capturada para un cotizador/plazo,
> se usa el valor por defecto. Ver `lib/cotizador/rates.ts` (defaults) y
> `lib/cotizador/ratesStore.ts` (lectura de overrides).
| `IVA` | 1.16 | Factor de IVA (16 %) |
| `CPA` | 0.03 | Comisión de apertura base (3 %) |
| `PS1` | 0.06 | Seguro auto ≤ $380,000 (6 % anual) |
| `PS2` | 0.05 | Seguro auto $380,001–$500,000 (5 % anual) |
| `PS3` | 0.04 | Seguro auto > $500,000 (4 % anual) |
| `PS1_CARGA` | 0.09 | Seguro carga ≤ $350,000 (9 % anual) |
| `PS2_CARGA` | 0.06 | Seguro carga $350,001–$700,000 (6 % anual) |
| `PS3_CARGA` | 0.04 | Seguro carga > $700,000 (4 % anual) |
| `RANGO1` | 380,000 | Límite 1 seguros auto |
| `RANGO2` | 500,000 | Límite 2 seguros auto |
| `RANGO1_CARGA` | 350,000 | Límite 1 seguros carga |
| `RANGO2_CARGA` | 700,000 | Límite 2 seguros carga |
| `SERVICES_BASE` | 2,400 | Costo base anual servicio preventivo |
| `VAR_DATA` | 0.0045 | Factor variable del precio para servicios |
| `ELECTRIC_SERVICES` | 9,313.33 | Promedio 3 servicios eléctricos anuales: (8,470 + 12,210 + 7,260) / 3 |
| `GPS_BASE` | 4,032 | Fee fijo de instalación GPS |
| `GPS_MONTHLY` | 138 | Tarifa mensual GPS estándar |
| `GPS_FACTOR` | 1.95 | Factor de margen GPS |
| `GPS_MONTHLY_REFIN` | 310.25641 | Tarifa mensual GPS exclusiva de refinanciamiento (sin fee base) |
| `TRAMITES_LIBRES` | 4,000 | Trámites fijos para carga pesada |
| `TENENCIAS_FIXED` | 2,000 | Tenencia fija anual (estados exentos) |
| `VERI` | 1,800 | Costo por verificación (estándar) |
| `VERI_FORANEOS` | 3,200 | Costo por verificación (foráneos) |
| `TENENCIA_FIXED_STATES` | `['no', 'morelos', 'hidalgo', 'puebla']` | Estados con tenencia fija $2,000/año en todas las secciones |

---

## 2. Tabla de placas y trámites

### Section ONE — Autos, VIP, Flotilla, Usado, Comisión Extra

| Estado | Trámites | Tenencia | Nota |
|---|---|---|---|
| Sin placas (`no`) | $4,000 | fija $2,000/año | Estado fijo |
| CDMX | $8,500 | 3.5 % del precio | — |
| Morelos | $8,500–$14,500 | fija $2,000/año | Precio escalonado por precio del vehículo¹ |
| Estado de México | $9,300 | 3.83 % del precio | — |
| Hidalgo | $9,500 | fija $2,000/año | Estado fijo |
| Jalisco | $13,750 | fija $2,000/año | **Solo en section_one**; en carga usa 3.5 % |
| Puebla | $8,750 | fija $2,000/año | Estado fijo |
| Querétaro | $12,760 | 3.5 % del precio | — |

¹ Rangos Morelos section_one: ≤$999,999=$8,500 · $1M–$1.9M=$9,500 · $2M–$2.9M=$11,500 · $3M–$3.9M=$13,000 · >$4M=$14,500

### Section TWO — Carga, Foráneo

| Estado | Trámites | Tenencia |
|---|---|---|
| CDMX | $11,000 | 4.2 % del precio |
| Morelos | $8,750 | fija $2,000/año |
| Estado de México | $16,000 | 4.2 % del precio |
| Hidalgo | $9,500 | fija $2,000/año |
| Jalisco | $13,750 | 3.5 % del precio |
| Puebla | $13,000 | fija $2,000/año |
| Querétaro | $16,000 | 3.5 % del precio |

### Section THREE — Eléctrico

| Estado | Trámites | Tenencia |
|---|---|---|
| CDMX | $9,300 | fija $2,000/año |
| Morelos | $8,750 | fija $2,000/año |
| Estado de México | $9,300 | fija $2,000/año |
| Querétaro | $14,000 | fija $2,000/año |

---

## 3. Funciones base del motor (`engine.ts`)

### 3.1 PMT — Cuota de renta mensual

Port idéntico de la función `PMT()` de Excel / PHP:

```
pvif  = (1 + tasa_mensual) ^ n_meses
fvifa = (pvif - 1) / tasa_mensual

pmt = (-pv × pvif - fv) / fvifa
```

- `tasa_mensual` = tasa_anual_% / 100 / 12
- `pv` = valor presente = `total × (1 - anticipo) + suma_costos`
- `fv` = valor futuro (negativo) = `total × -1 × residual`
- `n_meses` = plazo en meses

La renta mensual sin IVA = `PMT(...) × -1`, la renta **con IVA** = `PMT × -1 / 1.16`.

---

### 3.2 GPS (`calcGps`)

```
GPS = ((GPS_BASE + GPS_MONTHLY × meses) × IVA) × GPS_FACTOR
    = ((4,032 + 138 × meses) × 1.16) × 1.95
```

Ejemplos:
- 36 meses: ((4,032 + 138×36) × 1.16) × 1.95 = **15,989.23**
- 48 meses: ((4,032 + 138×48) × 1.16) × 1.95 = **19,912.32**

---

### 3.3 Seguro Auto (`calcSeguroAuto`)

Porcentaje **anual** aplicado sobre el precio total, multiplicado por los años:

```
tasa = 6% si total ≤ $380,000
     = 5% si $380,001 ≤ total ≤ $500,000
     = 4% si total > $500,000

seguro = ROUND(total × tasa × años, 2)
```

---

### 3.4 Seguro Carga (`calcSeguroCarga`)

Misma estructura pero con rangos diferentes:

```
tasa = 9% si total ≤ $350,000
     = 6% si $350,001 ≤ total ≤ $700,000
     = 4% si total > $700,000

seguro = ROUND(total × tasa × años, 2)
```

---

### 3.5 Servicios Preventivos (`calcServiciosPreventivos`)

Se calculan 2 servicios por año:

```
costo_anual   = SERVICES_BASE + VAR_DATA × precio
             = 2,400 + 0.0045 × precio

años_efectivos = MAX(0, años_contrato - servicios_incluidos_proveedor)
servicios      = costo_anual × 2 × años_efectivos
```

Si el usuario tiene un `servicesValue` manual:
```
servicios = servicesValue × 2 × años
```

---

### 3.6 Tenencias / Refrendos (`calcTenencias`)

```
1. Si estado ∈ TENENCIA_FIXED_STATES ['no','morelos','hidalgo','puebla']:
   tenencias = 2,000 × años

2. Si sección = section_one Y estado = 'jalisco':
   tenencias = 2,000 × años

3. Si placa.tenencia_percentage = 0 (o estado no existe):
   tenencias = 2,000 × años   ← fallback fijo

4. En caso general:
   tenencias = placa.tenencia_percentage × precio × años
```

---

### 3.7 Trámites iniciales (Placas)

`getPlacaPrice(precio, sección, estado)` → valor en $ de la tabla de la sección correspondiente.  
Morelos en section_one tiene rangos escalonados (ver tabla §2).

---

## 4. Motor central — `calcCore`

Todas las cotizaciones (excepto refinanciamiento) pasan por `calcCore` con estos parámetros:

| Parámetro | Descripción |
|---|---|
| `totalPrice` | Precio del vehículo sin accesorio |
| `accessoryValue` | Precio del accesorio adicional |
| `anticipo` | Porcentaje de anticipo (0.20 – 0.45) |
| `state` | Estado para placas y tenencias |
| `years` | Plazo en **años** (2, 3 o 4) |
| `varData1` | Valor residual (porcentaje decimal) |
| `tasa` | Tasa anual en % |
| `seguro` | Monto total de seguro ya calculado |
| `servicios` | Monto total de servicios ya calculado |
| `gps` | Monto total de GPS ya calculado |
| `tramitesLibres` | Monto de trámites/placas |
| `tenencias` | Monto total de tenencias ya calculado |
| `veriCost` | Monto total de verificaciones |
| `user.comision` | Comisión del ejecutivo (ej. 0.03 = 3%) |

### Paso 1 — Precio total

```
total = totalPrice + accessoryValue
```

### Paso 2 — Anticipo

```
anticipo_calc  = ROUND((total × anticipo) / 1.16, 2)
comision_ap    = ROUND(((total / 1.16) - anticipo_calc) × user.comision, 2)
anticipo_total = anticipo_calc + comision_ap
```

- El anticipo se **divide entre 1.16** porque el cliente paga sin IVA sobre la parte del anticipo
- La comisión de apertura se calcula sobre el saldo a financiar (sin IVA), multiplicado por el porcentaje del ejecutivo

### Paso 3 — Suma de costos integrados

```
suma = seguro + servicios + gps + tramites + tenencias + veri
```

Esta suma se agrega al saldo a financiar para amortizarla dentro de las rentas mensuales.

### Paso 4 — Renta mensual (PMT)

```
tasa_mensual = (tasa / 100) / 12
pv           = total × (1 - anticipo) + suma
fv           = total × -1 × varData1

pago_sin_iva = PMT(tasa_mensual, years×12, pv, fv) × -1
mensualidad  = ROUND(pago_sin_iva / 1.16, 2)
```

### Paso 5 — Valor residual (final cost)

```
finalCost = ROUND((total × varData1) / 1.16, 2)
```

Es el monto que el cliente puede pagar al final del contrato para quedarse con el vehículo.

### Paso 6 — Total de rentas + IVA

```
totalRentasMasIva = ROUND(mensualidad × (years × 12), 2)
```

### Paso 7 — Valor comercial al vencimiento

```
valorMercadoFinal = 0.78 - years × 0.08
valorComercial    = ROUND(total × valorMercadoFinal, 2)
```

Ejemplos: 3 años → 54 % del precio · 4 años → 46 % del precio

### Paso 8 — Importe a deducir (beneficio fiscal)

```
base_deduccion = anticipo_calc + finalCost + totalRentasMasIva

importe_deducir = ROUND(
  base × 0.30   ← deducción ISR (30%)
+ base × 0.16   ← IVA acreditable (16%)
+ base × 0.10,  ← IETU / factor adicional (10%)
2)

importe_deducir = ROUND(base × 0.56, 2)
```

---

## 5. Tipos de cotización

### 5.1 Auto

| Parámetro | Valor |
|---|---|
| Plazos | 36 y 48 meses |
| Residual | 35 % (36 m) · 30 % (48 m) |
| Tasa anual | 28 % (36 m) · 27 % (48 m) |
| Verificaciones | 6 (36 m) · 8 (48 m) × $1,800 |
| Seguro | `calcSeguroAuto` (rangos auto: 6/5/4 %) |
| Servicios | `calcServiciosPreventivos` |
| GPS | `calcGps` estándar |
| Trámites | `getPlacaPrice` section_one |
| Tenencias | `calcTenencias` section_one |

---

### 5.2 VIP

Idéntico a **Auto** en todo, excepto la tasa anual:

| Parámetro | Valor |
|---|---|
| Tasa anual | **26 %** (36 m) · **25 %** (48 m) |

---

### 5.3 Carga

| Parámetro | Valor |
|---|---|
| Plazos | 36, 48 y 60 meses |
| Residual | 15 % (36 m) · 10 % (48 m) · 5 % (60 m) |
| Tasa anual | 28 % (36 m) · 27 % (48 m) · 26 % (60 m) |
| Verificaciones | 6 (36 m) · 8 (48 m) · 10 (60 m) × $1,800 |
| Seguro | `calcSeguroCarga` (rangos carga: 9/6/4 %) |
| Servicios | `calcServiciosPreventivos` |
| GPS | `calcGps` estándar |
| Trámites | `getPlacaPrice` **section_two** |
| Tenencias | `calcTenencias` **section_two** |

Diferencia clave vs Auto: residual más bajo (vehículo deprecia más), seguro con rangos de carga, tablas de placas section_two.

---

### 5.4 Carga Pesada

| Parámetro | Valor |
|---|---|
| Plazos | 36, 48 y 60 meses |
| Residual | 15 % (36 m) · 10 % (48 m) · 5 % (60 m) |
| Tasa anual | 28 % (36 m) · 27 % (48 m) · 26 % (60 m) |
| Seguro | 4.5 % si total < $2,000,000 · **6.5 %** si ≥ $2,000,000 |
| Servicios | **0** (no incluidos) |
| GPS | `calcGps` estándar |
| Trámites | **$4,000 fijos** (`TRAMITES_LIBRES`) |
| Tenencias | **0** (no incluidas) |
| Verificaciones | **0** (no incluidas) |

Características especiales:
- Seguro con tasas más altas para vehículos de carga pesada industrial
- Sin servicios preventivos (el cliente los gestiona directamente)
- Sin tenencias ni verificaciones (régimen especial de peso vehicular)
- Trámites fijos, no dependen del estado

---

### 5.4.1 Carga pesada especial

Idéntico a **Carga Pesada** más la misma comisión adicional del Cotizador especial
(`VARS.COMISION_EXTRA_PCT` = 2.75 % sobre el valor a financiar, distribuida en las rentas):

```
base            = calcCargaPesada(input, user, meses)
valor_financiar = total × (1 - anticipo)
comision_total  = valor_financiar × 0.0275
renta_extra     = comision_total / meses          ← meses = 36 | 48 | 60

mensualidad     = ROUND(base.mensualidad + renta_extra, 2)
total_rentas    = ROUND(mensualidad × meses, 2)
importe_deducir se recalcula con la nueva mensualidad (× 0.56)
```

---

### 5.5 Eléctrico

| Parámetro | Valor |
|---|---|
| Plazos | 36 y 48 meses |
| Residual | 35 % (36 m) · 30 % (48 m) |
| Tasa anual | 28 % (36 m) · 27 % (48 m) |
| Seguro | **4 % fijo** × precio × años |
| Servicios | `ELECTRIC_SERVICES × MAX(0, años - servicios_incluidos)` = $9,313.33/año efectivo |
| GPS | `calcGps` estándar |
| Trámites | `getPlacaPrice` **section_three** |
| Tenencias | `calcTenencias` **section_three** |
| Verificaciones | **0** (vehículos eléctricos no verifican) |

Servicios eléctricos = promedio de 3 revisiones anuales especializadas:
- Revisión básica: $8,470
- Revisión intermedia: $12,210
- Revisión mayor: $7,260
- **Promedio**: $9,313.33/año

---

### 5.6 Foráneo

Idéntico a **Carga** en residual, tasa y seguro, pero con diferente tarifa de verificación:

| Parámetro | Valor |
|---|---|
| Verificaciones | 6 (36 m) · 8 (48 m) × **$3,200** (`VERI_FORANEOS`) |
| Demás componentes | Igual a Carga (section_two) |

---

### 5.7 Usado

| Parámetro | Valor |
|---|---|
| Plazos | 36 y 48 meses |
| Residual | 20 % (36 m) · 15 % (48 m) |
| Tasa anual | 28 % (36 m) · 27 % (48 m) |
| Verificaciones | 6 (36 m) · 8 (48 m) × $1,800 |
| Servicios | **0** (no incluidos) |
| GPS | `calcGps` estándar |
| Trámites | `getPlacaPrice` section_one |
| Tenencias | `calcTenencias` section_one |

#### Ajuste de anticipo por Autométrica

Si el cliente proporciona el `autometricaValue` (precio libro Autométrica, generalmente menor al precio comercial):

```
diferencia      = (precio_comercial - autometricaValue) / precio_comercial
anticipo_ajust  = CEIL((anticipo_base + diferencia) × 100) / 100
```

La diferencia entre el precio de venta y el valor Autométrica se suma al anticipo porque el arrendador solo puede financiar hasta el valor Autométrica.

#### Seguro sobre Autométrica

```
base_seguro = autometricaValue   (si existe, sino precio_comercial)
seguro      = ROUND(base_seguro × 0.04 × años, 2)
```

El seguro de usados es siempre **4 % fijo** calculado sobre el valor Autométrica.

---

### 5.8 Flotilla

| Parámetro | Valor |
|---|---|
| Plazos | **24, 36 y 48** meses |
| Residual | **Configurable por el usuario** por plazo (default 30 %) |
| Tasa anual | 28 % (24 m y 36 m) · 27 % (48 m) |
| Seguro | `calcSeguroAuto` · **conmutable** (`includeInsurance`) |
| Servicios | `calcServiciosPreventivos` |
| GPS | `calcGps` · **conmutable** (`includeGps`) |
| Trámites | `getPlacaPrice` section_one |
| Tenencias | `calcTenencias` section_one · **conmutable** (`includeTenencias`) |
| Verificaciones | 4 (24 m) · 6 (36 m) · 8 (48 m) × $1,800 · **conmutable** (`includeVerificaciones`) |

La flotilla permite que el vendedor active/desactive cada componente individualmente y defina el valor residual de cada plazo, lo que la hace la cotización más flexible.

---

### 5.9 Comisión Extra

Parte de la base de **Flotilla** y agrega una comisión adicional del 2 % sobre el valor a financiar, distribuida en las rentas:

```
base            = calcFlotilla(input, user, years)  ← cotización normal flotilla

valor_financiar = total × (1 - anticipo)
comision_total  = valor_financiar × 0.02
renta_extra     = comision_total / meses             ← meses = 24 | 36 | 48

mensualidad     = ROUND(base.mensualidad + renta_extra, 2)
total_rentas    = ROUND(mensualidad × meses, 2)
```

Ejemplo ($1,000,000 · 20 % anticipo · 48 m):
```
valor_financiar  = $800,000
comision_total   = $16,000
renta_extra      = $16,000 / 48 = $333.33/mes
mensualidad_final = base + $333.33
```

El `importeDeducir` se **recalcula** con la nueva mensualidad:
```
base_deduccion  = anticipo_calc + finalCost + totalRentasMasIva (nuevo)
importe_deducir = ROUND(base × 0.56, 2)
```

---

### 5.10 Refinanciamiento

Este tipo es **completamente diferente** a los demás. Plazos de 12 y 24 meses.

| Parámetro | 12 meses | 24 meses |
|---|---|---|
| Residual | **9 %** | **3 %** |
| Tasa anual | 28 % | 27 % |
| Verificaciones | 2 × $1,800 | 4 × $1,800 |

#### GPS de refinanciamiento (diferente al estándar)

```
GPS = ((GPS_MONTHLY_REFIN × meses) × IVA) × GPS_FACTOR
    = ((310.25641 × meses) × 1.16) × 1.95
```

Sin fee de instalación (`GPS_BASE`), solo tarifa mensual.

#### Seguro

Mismos rangos que autos (380k/500k), no de carga.

#### Servicios

```
servicios = servicesValue × años    ← factor ×1 (no ×2 como en los demás tipos)
```

#### Trámites

**Siempre $0** en refinanciamiento.

#### Tenencias

Estados fijos en refinanciamiento: `['no', 'morelos', 'hidalgo', 'puebla', 'jalisco']` → $2,000/año  
El resto → 3.5 % del precio × años.

#### Anticipo

```
anticipo_calc  = ROUND((total × anticipo) / 1.16, 2)
comision_ap    = ROUND(((total / 1.16) - anticipo_calc) × user.comision, 2)
anticipo_total = anticipo_calc + comision_ap
```

#### Renta mensual

```
pago = (PMT(tasa_mensual, meses, total×(1-anticipo)+suma, total×-1×residual) × -1) / 1.16
mensualidad = ROUND(pago, 2)
```

#### Valor comercial al vencimiento

```
valorVehiculo = 0    ← legacy siempre devuelve 0 en refinanciamiento
```

#### Importe a deducir — **cálculo diferente**

En refinanciamiento la base incluye `anticipo_total` (no `anticipo_calc`) y **se divide entre 1.16**:

```
base_refin      = anticipo_total + finalCost + totalRentasMasIva

importe_deducir = ROUND(
  (base_refin / 1.16) × 0.30
+ (base_refin / 1.16) × 0.16
+ (base_refin / 1.16) × 0.10,
2)
= ROUND((base_refin / 1.16) × 0.56, 2)
```

---

## 6. Resumen de diferencias por tipo

| Tipo | Residual | Tasa | Seguro | Servicios | Trámites | Tenencias | Veri |
|---|---|---|---|---|---|---|---|
| Auto | 35/30 % | 28/27 % | auto (6/5/4%) | preventivos ×2 | section_one | section_one | 6/8 × $1,800 |
| VIP | 35/30 % | **26/25 %** | auto (6/5/4%) | preventivos ×2 | section_one | section_one | 6/8 × $1,800 |
| Carga | 15/10/5 % | 28/27/26 % | **carga (9/6/4%)** | preventivos ×2 | section_two | section_two | 6/8/10 × $1,800 |
| Carga Pesada | 15/10/5 % | 28/27/26 % | **4.5/6.5% fijo** | **0** | **$4,000 fijo** | **0** | **0** |
| Carga pesada especial | 15/10/5 % | 28/27/26 % | **4.5/6.5% fijo** | **0** | **$4,000 fijo** | **0** | **+ 2.75% s/financiado** |
| Eléctrico | 35/30 % | 28/27 % | **4% fijo** | **eléctricos** | section_three | section_three | **0** |
| Foráneo | 35/30 % | 28/27 % | auto (6/5/4%) | preventivos ×2 | section_two | section_two | 6/8 × **$3,200** |
| Usado | 20/15 % | 28/27 % | **4% sobre Autométrica** | **0** | section_one | section_one | 6/8 × $1,800 |
| Flotilla | **dinámico** | 28/27 % | auto (opcional) | preventivos ×2 | section_one | section_one (opcional) | 4/6/8 × $1,800 (opcional) |
| Comisión Extra | **dinámico** | 28/27 % | auto (opcional) | preventivos ×2 | section_one | section_one (opcional) | **+ 2% s/financiado** |
| Refinanciamiento | **9/3 %** | 28/27 % | auto (6/5/4%) | ×1 (no ×2) | **$0** | lista especial | 2/4 × $1,800 |

---

## 7. Flujo completo — ejemplo numérico (Auto, $500,000, CDMX, 25 % anticipo, 36 meses)

```
total          = $500,000
años           = 3
tasa_mensual   = 28% / 100 / 12 = 0.023333

1. Seguro (auto, >$380k, <=$500k → 5%)
   seguro = $500,000 × 0.05 × 3 = $75,000

2. Servicios preventivos (0 incluidos)
   costo_anual  = 2,400 + 0.0045 × 500,000 = $4,650
   servicios    = $4,650 × 2 × 3 = $27,900

3. GPS (36 meses)
   GPS = ((4,032 + 138×36) × 1.16) × 1.95
       = ((4,032 + 4,968) × 1.16) × 1.95
       = (9,000 × 1.16) × 1.95
       = 10,440 × 1.95 = $20,358

4. Trámites (CDMX, section_one)
   tramites = $8,500

5. Tenencias (CDMX, 3.5%)
   tenencias = 0.035 × $500,000 × 3 = $52,500

6. Verificaciones
   veri = 6 × $1,800 = $10,800

7. Suma costos integrados
   suma = 75,000 + 27,900 + 20,358 + 8,500 + 52,500 + 10,800 = $195,058

8. Anticipo
   anticipo_calc = ROUND(($500,000 × 0.25) / 1.16, 2) = ROUND($107,758.62, 2) = $107,758.62
   comision_ap   = ROUND(($500,000/1.16 - $107,758.62) × 0.03, 2)
                 = ROUND(($431,034.48 - $107,758.62) × 0.03, 2)
                 = ROUND($323,275.86 × 0.03, 2) = $9,698.28
   anticipo_total = $107,758.62 + $9,698.28 = $117,456.90

9. PMT
   pv = $500,000 × (1 - 0.25) + $195,058 = $375,000 + $195,058 = $570,058
   fv = $500,000 × -1 × 0.35 = -$175,000

   pvif  = (1 + 0.023333)^36 = 2.29891
   fvifa = (2.29891 - 1) / 0.023333 = 55.636

   pmt   = (-$570,058 × 2.29891 - (-$175,000)) / 55.636
         = (-$1,310,507 + $175,000) / 55.636
         = -$1,135,507 / 55.636 = -$20,408.37

   mensualidad = ROUND($20,408.37 / 1.16, 2) = $17,593.42

10. Final cost (valor residual)
    finalCost = ROUND(($500,000 × 0.35) / 1.16, 2) = $150,862.07

11. Total rentas + IVA
    totalRentasMasIva = ROUND($17,593.42 × 36, 2) = $633,363.12

12. Valor comercial al vencimiento
    valorMercadoFinal = 0.78 - 3 × 0.08 = 0.54
    valorComercial    = ROUND($500,000 × 0.54, 2) = $270,000

13. Importe a deducir
    base = $107,758.62 + $150,862.07 + $633,363.12 = $891,983.81
    importe_deducir = ROUND($891,983.81 × 0.56, 2) = $499,510.93
```

---

*Generado a partir del código fuente en `lib/cotizador/`. Para verificar algún valor específico, revisar el archivo del calculador correspondiente en `lib/cotizador/calculators/`.*
