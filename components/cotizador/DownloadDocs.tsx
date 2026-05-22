'use client'

import { FileText, FileSpreadsheet } from 'lucide-react'

const DOCS = [
  { label: 'Checklist\nPersona Física', href: '/docs/cotizador/checklist-persona-fisica.pdf',  icon: 'pdf' },
  { label: 'Checklist\nPersona Moral',  href: '/docs/cotizador/checklist-persona-moral.pdf',   icon: 'pdf' },
  { label: 'Buró de\ncrédito',          href: '/docs/cotizador/buro-credito.pdf',              icon: 'pdf' },
  { label: 'Solicitud\nRenting',        href: '/docs/cotizador/solicitud-renting.xlsx',        icon: 'xls' },
]

export function DownloadDocs() {
  return (
    <div className="mt-10 border-t border-white/10 pt-6">
      <h3 className="font-sans mb-4 text-sm font-semibold text-white/60 uppercase tracking-widest">
        Descargar
      </h3>
      <div className="flex flex-wrap gap-3">
        {DOCS.map(doc => (
          <a
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex flex-col items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs text-white/60 transition-colors hover:border-gold/30 hover:bg-gold/5 hover:text-white cursor-pointer w-28"
          >
            {doc.icon === 'xls'
              ? <FileSpreadsheet size={22} className="text-gold/70 shrink-0" />
              : <FileText size={22} className="text-gold/70 shrink-0" />
            }
            <span className="leading-tight whitespace-pre-line">{doc.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
