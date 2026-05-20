import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'
import type { QuoteResponse, QuoteType } from '@/lib/cotizador/types'

const GOLD     = '#e1be4a'
const BLACK    = '#0a0a0a'
const GRAY     = '#888888'
const LIGHT    = '#f0f0f0'
const styles = StyleSheet.create({
  page:        { backgroundColor: '#ffffff', padding: 40, fontFamily: 'Helvetica', fontSize: 9, color: BLACK },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 2, borderBottomColor: GOLD },
  logoImg:     { width: 100, height: 32, objectFit: 'contain', marginBottom: 4 },
  logo:        { fontSize: 14, fontFamily: 'Helvetica-Bold', color: GOLD, letterSpacing: 2 },
  subtitle:    { fontSize: 7, color: GRAY, marginTop: 2 },
  title:       { fontSize: 13, fontFamily: 'Helvetica-Bold', color: BLACK },
  meta:        { fontSize: 8, color: GRAY, marginTop: 3 },
  section:     { marginBottom: 16 },
  sectionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#ffffff', backgroundColor: GOLD, padding: '4 8', marginBottom: 0 },
  table:       { borderWidth: 1, borderColor: LIGHT },
  row:         { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: LIGHT },
  rowAlt:      { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: LIGHT, backgroundColor: '#fafafa' },
  cell:        { flex: 1, padding: '5 8', fontSize: 8 },
  cellRight:   { flex: 1, padding: '5 8', fontSize: 8, textAlign: 'right', fontFamily: 'Helvetica-Bold' },
  footer:      { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: LIGHT, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' },
  footerText:  { fontSize: 7, color: GRAY },
})

function fmt(n: number) {
  return `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const PERIOD_LABELS: Record<string, string> = {
  '12': '12 meses', '24': '24 meses', '36': '36 meses', '48': '48 meses',
}

interface Props {
  result:     QuoteResponse
  quoteType:  QuoteType
  modelo:     string
  totalPrice: number
  logoPath?:  string
}

export function PDFTemplate({ result, quoteType, modelo, totalPrice, logoPath }: Props) {
  const periods = Object.keys(result).sort()
  const date    = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            {logoPath && <Image style={styles.logoImg} src={logoPath} />}
            <Text style={styles.logo}>U RENT IT</Text>
            <Text style={styles.subtitle}>Cotización de Arrendamiento Puro</Text>
          </View>
          <View>
            <Text style={styles.title}>{modelo || 'Cotización'}</Text>
            <Text style={styles.meta}>Valor del vehículo: {fmt(totalPrice)}</Text>
            <Text style={styles.meta}>Fecha: {date}</Text>
            <Text style={styles.meta}>Tipo: {quoteType.toUpperCase()}</Text>
          </View>
        </View>

        {/* Tabla por plazo */}
        {periods.map(period => {
          const r = result[period as keyof QuoteResponse]
          if (!r) return null
          const { costs: c, eachMonth: e } = r

          const mainRows = [
            ['Anticipo',                              fmt(c.anticipo)],
            ['Comisión de apertura',                  fmt(c.comisionAp)],
            ['Anticipo total',                        fmt(c.anticipoTotal)],
            ['Renta mensual',                         fmt(c.mensualidad)],
            ['Valor residual / Compra final',         fmt(c.finalCost)],
            ['Total rentas + IVA',                    fmt(c.totalRentasMasIva)],
            ['Valor comercial al vencimiento',        fmt(c.valorVehiculo)],
            ['Importe a deducir (ISR + IVA + PTU)',   fmt(c.importeDeducir)],
          ]

          const breakRows = [
            ['Valor del vehículo',       fmt(e.valorTotal)],
            ['Seguro (con IVA)',          fmt(e.seguro)],
            ['Servicios preventivos',    fmt(e.services)],
            ['GPS',                      fmt(e.gps)],
            ['Trámites iniciales',       fmt(e.tramitesL)],
            ['Tenencias / Refrendos',    fmt(e.tenencias)],
            ['Verificaciones',           fmt(e.veri)],
            ...(e.accessoryValue > 0 ? [[`Accesorio: ${e.accessory}`, fmt(e.accessoryValue)]] : []),
          ]

          return (
            <View key={period} style={styles.section}>
              <View style={[styles.sectionTitle as any]}>
                <Text>{PERIOD_LABELS[period] ?? `${period} meses`}</Text>
              </View>
              <View style={styles.table}>
                {mainRows.map(([label, value], i) => (
                  <View key={label} style={i % 2 === 0 ? styles.row : styles.rowAlt}>
                    <Text style={styles.cell}>{label}</Text>
                    <Text style={styles.cellRight}>{value}</Text>
                  </View>
                ))}
              </View>

              <Text style={{ fontSize: 8, color: GRAY, marginTop: 8, marginBottom: 4 }}>
                Componentes incluidos en la renta mensual:
              </Text>
              <View style={styles.table}>
                {breakRows.map(([label, value], i) => (
                  <View key={label} style={i % 2 === 0 ? styles.row : styles.rowAlt}>
                    <Text style={styles.cell}>{label}</Text>
                    <Text style={styles.cellRight}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )
        })}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>U RENT IT — ¡Aspira a más!</Text>
          <Text style={styles.footerText}>urentit.mx · (55) 1806-2633</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
