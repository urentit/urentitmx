import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import type { QuoteResponse, QuoteResult, QuoteType } from '@/lib/cotizador/types'

const GOLD  = '#e1be4a'
const BLACK = '#0a0a0a'
const GRAY  = '#888888'
const LIGHT = '#e8e8e8'

const S = StyleSheet.create({
  page:        { backgroundColor: '#ffffff', padding: 30, fontFamily: 'Helvetica', fontSize: 8, color: BLACK },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, paddingBottom: 11, borderBottomWidth: 2, borderBottomColor: GOLD },
  logoImg:     { width: 88, height: 27, objectFit: 'contain', marginBottom: 2 },
  logoName:    { fontSize: 12, fontFamily: 'Helvetica-Bold', color: GOLD, letterSpacing: 2 },
  logoSub:     { fontSize: 6.5, color: GRAY, marginTop: 2 },
  docTitle:    { fontSize: 12, fontFamily: 'Helvetica-Bold', color: BLACK, textAlign: 'right' },
  docMeta:     { fontSize: 7.5, color: GRAY, marginTop: 2, textAlign: 'right' },

  tableWrap:   { borderWidth: 1, borderColor: LIGHT },
  tHead:       { flexDirection: 'row', backgroundColor: BLACK },
  tRow:        { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: LIGHT },
  tRowAlt:     { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: LIGHT, backgroundColor: '#f7f7f7' },
  tRowBold:    { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: LIGHT, backgroundColor: '#fffbe6' },

  cLabel:      { flex: 2.4, padding: '4 7', fontSize: 7.5 },
  cLabelBold:  { flex: 2.4, padding: '4 7', fontSize: 7.5, fontFamily: 'Helvetica-Bold' },
  cVal:        { flex: 1, padding: '4 7', fontSize: 7.5, textAlign: 'right', borderLeftWidth: 1, borderLeftColor: LIGHT },
  cValBold:    { flex: 1, padding: '4 7', fontSize: 7.5, textAlign: 'right', fontFamily: 'Helvetica-Bold', color: '#7a6200', borderLeftWidth: 1, borderLeftColor: LIGHT },
  cHead:       { flex: 2.4, padding: '4 7', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  cHeadVal:    { flex: 1, padding: '4 7', fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: GOLD, textAlign: 'center', borderLeftWidth: 1, borderLeftColor: '#444444' },


  checkRow:    { flexDirection: 'row', borderWidth: 1, borderColor: LIGHT, marginTop: 10 },
  checkLabel:  { flex: 2.4, padding: '4 7', fontSize: 7.5 },
  checkCell:   { flex: 1, padding: '4 7', fontSize: 7.5, textAlign: 'center', borderLeftWidth: 1, borderLeftColor: LIGHT },

  cons:        { marginTop: 10, padding: '7 9', borderWidth: 1, borderColor: LIGHT, backgroundColor: '#f9f9f9' },
  consTitle:   { fontSize: 7.5, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  consBullet:  { fontSize: 7, color: '#444444', marginBottom: 2 },
  disclaimer:  { marginTop: 5, fontSize: 6.5, color: GRAY, fontFamily: 'Helvetica-Oblique', lineHeight: 1.4 },

  signLine:    { marginTop: 18, borderTopWidth: 1, borderTopColor: BLACK, width: 200, alignSelf: 'center' },
  signLabel:   { fontSize: 7, color: GRAY, textAlign: 'center', marginTop: 3, alignSelf: 'center' },

  footer:      { position: 'absolute', bottom: 20, left: 30, right: 30, borderTopWidth: 1, borderTopColor: LIGHT, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt:   { fontSize: 6.5, color: GRAY },
})

function fmt(n: number) {
  return `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const PERIOD_LABELS: Record<string, string> = {
  '12': '12 meses', '24': '24 meses', '36': '36 meses', '48': '48 meses',
}

interface TableBlockProps {
  title:       string
  rows:        { label: string; bold?: boolean; get: (d: QuoteResult) => string }[]
  periods:     string[]
  periodData:  QuoteResult[]
}

function TableBlock({ title, rows, periods, periodData }: TableBlockProps) {
  return (
    <View style={S.tableWrap}>
      <View style={S.tHead}>
        <Text style={S.cHead}>{title}</Text>
        {periods.map(p => (
          <Text key={p} style={S.cHeadVal}>{PERIOD_LABELS[p] ?? `${p}m`}</Text>
        ))}
      </View>
      {rows.map((row, i) => (
        <View key={row.label} style={row.bold ? S.tRowBold : i % 2 === 0 ? S.tRow : S.tRowAlt}>
          <Text style={row.bold ? S.cLabelBold : S.cLabel}>{row.label}</Text>
          {periodData.map((d, j) => (
            <Text key={j} style={row.bold ? S.cValBold : S.cVal}>{row.get(d)}</Text>
          ))}
        </View>
      ))}
    </View>
  )
}

interface Props {
  result:     QuoteResponse
  quoteType:  QuoteType
  modelo:     string
  totalPrice: number
  anticipo?:  number
  logoPath?:  string
}

const QUOTE_TYPE_LABELS: Record<string, string> = {
  'auto':             'Autos',
  'vip':              'VIP / Lujo',
  'carga':            'Carga',
  'carga-pesada':     'Carga Pesada',
  'electrico':        'Eléctrico',
  'foraneo':          'Foráneo',
  'usado':            'Vehículo Usado',
  'flotilla':         'Flotilla',
  'comision-extra':   'Cotizador especial',
  'refinanciamiento': 'Refinanciamiento',
}

export function PDFTemplate({ result, quoteType, modelo, totalPrice, anticipo, logoPath }: Props) {
  const periods    = Object.keys(result).sort()
  const periodData = periods.map(p => result[p as keyof QuoteResponse]!)
  const date       = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
  const quoteNo    = String(Math.floor(Date.now() / 1000) % 99999).padStart(5, '0')
  const anticipoPct = anticipo ? Math.round(anticipo * 100) : 25

  const mainRows: TableBlockProps['rows'] = [
    { label: `Anticipo al ${anticipoPct}%`,        get: d => fmt(d.costs.anticipo) },
    { label: 'Comisión de apertura',               get: d => fmt(d.costs.comisionAp) },
    { label: 'Anticipo total',                     get: d => fmt(d.costs.anticipoTotal) },
    { label: 'Renta mensual (+IVA)',               get: d => fmt(d.costs.mensualidad), bold: true },
    { label: 'Valor residual / Compra final',      get: d => fmt(d.costs.finalCost) },
    { label: 'Total rentas + IVA',                 get: d => fmt(d.costs.totalRentasMasIva) },
    { label: 'Valor comercial al vencimiento',     get: d => fmt(d.costs.valorVehiculo) },
    { label: 'Importe a deducir (ISR+IVA+PTU)',    get: d => fmt(d.costs.importeDeducir) },
    { label: 'Entidad placas',                     get: d => d.eachMonth.placas },
  ]

  const breakRows: TableBlockProps['rows'] = [
    { label: 'Valor del vehículo. IVA Incluido',    get: d => fmt(d.eachMonth.valorTotal) },
    { label: 'Seguro del auto. IVA Incluido',       get: d => fmt(d.eachMonth.seguro) },
    { label: 'Accesorios',                          get: d => d.eachMonth.accessoryValue > 0 ? `${d.eachMonth.accessory}: ${fmt(d.eachMonth.accessoryValue)}` : fmt(0) },
    { label: 'Servicio preventivo. IVA Incluido',   get: d => fmt(d.eachMonth.services) },
    { label: 'Localización GPS. IVA Incluido',      get: d => fmt(d.eachMonth.gps) },
    { label: 'Trámites iniciales. Libres de IVA',   get: d => fmt(d.eachMonth.tramitesL) },
    { label: 'Tenencias o Refrendos. Libres de IVA',get: d => fmt(d.eachMonth.tenencias) },
    { label: 'Verificaciones. Libres de IVA',       get: d => fmt(d.eachMonth.veri) },
  ]

  return (
    <Document>
      <Page size="LETTER" style={S.page}>

        {/* ── Header ── */}
        <View style={S.header}>
          <View>
            {logoPath && <Image style={S.logoImg} src={logoPath} />}
            <Text style={S.logoName}>U RENT IT</Text>
            <Text style={S.logoSub}>Cotización de Arrendamiento Puro</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={S.docMeta}>No. {quoteNo}</Text>
            <Text style={S.docMeta}>Fecha: {date}</Text>
            <Text style={[S.docTitle, { marginTop: 4 }]}>{modelo || 'Cotización'}</Text>
            <Text style={S.docMeta}>Valor del vehículo: {fmt(totalPrice)}</Text>
            <Text style={S.docMeta}>Tipo: {QUOTE_TYPE_LABELS[quoteType] ?? quoteType}</Text>
          </View>
        </View>

        {/* ── Tabla principal ── */}
        <TableBlock
          title="Resumen por plazo"
          rows={mainRows}
          periods={periods}
          periodData={periodData}
        />
        <Text style={{ fontSize: 7, color: GRAY, marginTop: 3, marginBottom: 2, fontFamily: 'Helvetica-Oblique' }}>
          Importes más IVA.
        </Text>

        {/* ── Desglose de la renta ── */}
        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: BLACK, marginTop: 8, marginBottom: 3 }}>
          Que va incluido en la renta mensual:
        </Text>
        <TableBlock
          title="Desglose mensual"
          rows={breakRows}
          periods={periods}
          periodData={periodData}
        />

        {/* ── Marcar plazo ── */}
        <View style={S.checkRow}>
          <Text style={S.checkLabel}>Favor de marcar con una X el plazo deseado:</Text>
          {periods.map(p => (
            <Text key={p} style={S.checkCell}>{PERIOD_LABELS[p] ?? `${p} meses`}</Text>
          ))}
        </View>

        {/* ── Consideraciones ── */}
        <View style={S.cons}>
          <Text style={S.consTitle}>*Consideraciones:</Text>
          {[
            'No hay etiqueta fiscal. El coche está a nombre de la arrendadora.',
            'Deducción total (en IVA e ISR) de todas las rentas.',
            'Utilidad final en la diferencia de compra y venta.',
            'El Arrendamiento incluye: Seguro Platinum, Servicios, Localizador GPS, Verificaciones, Trámites iniciales.',
            'Flujo mensual constante y fijo.',
            'Gastos deducibles TODOS los meses del año. Buena práctica fiscal, sobre todo ahora con la Contabilidad en Línea.',
          ].map((item, i) => (
            <Text key={i} style={S.consBullet}>{'- ' + item}</Text>
          ))}
          <Text style={S.disclaimer}>
            La presente propuesta de RENTING es únicamente informativa, requiere de su aprobación y puede ser modificada
            en cualquier momento. Tiene vigencia del mes en Curso.
          </Text>
        </View>

        {/* ── Firma ── */}
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <View style={S.signLine} />
          <Text style={S.signLabel}>Nombre y Firma de Autorización</Text>
        </View>

        {/* ── Footer ── */}
        <View style={S.footer} fixed>
          <Text style={S.footerTxt}>U RENT IT — ¡Aspira a más!</Text>
          <Text style={S.footerTxt}>urentit.mx · (55) 1806-2633</Text>
          <Text style={S.footerTxt} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>

      </Page>
    </Document>
  )
}
