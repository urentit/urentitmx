'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Plus, ShieldCheck, UserX, UserCheck, Mail, X, LayoutGrid, ChevronDown, KeyRound } from 'lucide-react'
import { clsx } from 'clsx'
import { ALL_SECTIONS, SECTION_LABELS, parseAllowedSections } from '@/lib/cotizador/sections'
import type { QuoteType } from '@/lib/cotizador/types'

interface AdminUser {
  id:              number
  name:            string
  email:           string
  admin:           boolean
  active:          boolean
  comision:        number
  manualServices:  boolean
  allowedSections: QuoteType[] | null
  hasPassword:     boolean
  lastLoginAt:     string | null
  lastLoginMethod: 'google' | 'password' | null
  createdAt:       string
  _count:          { quotes: number }
}

const METHOD_LABELS: Record<string, string> = {
  google:   'Google',
  password: 'Contraseña',
}

function fmtLastLogin(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

const createSchema = z.object({
  name:     z.string().min(2, 'Mínimo 2 caracteres'),
  email:    z.string().email('Correo no válido'),
  admin:    z.boolean(),
  comision: z.string(),
  password: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
  invitar:  z.boolean(),
})

type CreateValues = z.infer<typeof createSchema>

const inputCls  = 'w-full rounded border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-gold/50 focus:outline-none transition-colors'
const selectCls = 'w-full rounded border border-white/10 bg-[#1c1c1c] px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors cursor-pointer'
const labelCls  = 'mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wide'

const COMISION_OPTS = [
  { value: '0',     label: '0%' },
  { value: '0.01',  label: '1%' },
  { value: '0.02',  label: '2%' },
  { value: '0.025', label: '2.5%' },
  { value: '0.03',  label: '3%' },
]

export function UsersAdmin() {
  const [users, setUsers]     = useState<AdminUser[] | null>(null)
  const [error, setError]     = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [busyId, setBusyId]   = useState<number | null>(null)
  const [notice, setNotice]   = useState<string | null>(null)
  const [matrixId, setMatrixId] = useState<number | null>(null)
  const [pwdId, setPwdId]       = useState<number | null>(null)
  const [pwdValue, setPwdValue] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', email: '', admin: false, comision: '0.03', password: '', invitar: true },
  })

  const load = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch('/api/cotizador/usuarios')
      const json = await res.json()
      if (!res.ok) throw new Error(json.message ?? 'Error cargando usuarios')
      setUsers(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error cargando usuarios')
      setUsers([])
    }
  }, [])

  useEffect(() => { load() }, [load])

  const onCreate = async (values: CreateValues) => {
    setSaving(true)
    setNotice(null)
    try {
      const res = await fetch('/api/cotizador/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     values.name,
          email:    values.email,
          admin:    values.admin,
          comision: parseFloat(values.comision),
          ...(values.password ? { password: values.password } : {}),
          invitar:  values.invitar,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message ?? 'No se pudo crear el usuario')
      setNotice(json.invited
        ? `Usuario creado. Se envió invitación a ${values.email}.`
        : 'Usuario creado.')
      reset()
      setShowForm(false)
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo crear el usuario')
    } finally {
      setSaving(false)
    }
  }

  const patch = async (id: number, data: Partial<Pick<AdminUser, 'admin' | 'active' | 'comision' | 'allowedSections'>>) => {
    setBusyId(id)
    setError(null)
    try {
      const res = await fetch(`/api/cotizador/usuarios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message ?? 'No se pudo actualizar')
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar')
    } finally {
      setBusyId(null)
    }
  }

  // Marca/desmarca una sección; con las 10 marcadas se normaliza a null (todas)
  const toggleSection = (u: AdminUser, section: QuoteType) => {
    const current = parseAllowedSections(u.allowedSections) ?? [...ALL_SECTIONS]
    const next = current.includes(section)
      ? current.filter(s => s !== section)
      : [...current, section]
    patch(u.id, { allowedSections: next.length === ALL_SECTIONS.length ? null : next })
  }

  const generatePassword = () => {
    // Sin caracteres ambiguos (0/O, 1/l/I) para compartirla sin errores
    const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789'
    const bytes = new Uint8Array(12)
    crypto.getRandomValues(bytes)
    setPwdValue(Array.from(bytes, b => chars[b % chars.length]).join(''))
  }

  const savePassword = async (u: AdminUser) => {
    if (pwdValue.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setBusyId(u.id)
    setError(null)
    try {
      const res = await fetch(`/api/cotizador/usuarios/${u.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwdValue }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message ?? 'No se pudo guardar la contraseña')
      setNotice(`Contraseña ${u.hasPassword ? 'actualizada' : 'asignada'} para ${u.email}. Compártela de forma segura; no se volverá a mostrar.`)
      setPwdId(null)
      setPwdValue('')
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar la contraseña')
    } finally {
      setBusyId(null)
    }
  }

  const sectionSummary = (u: AdminUser) => {
    if (u.admin) return 'Todas (admin)'
    const allowed = parseAllowedSections(u.allowedSections)
    if (allowed === null) return 'Todas'
    if (allowed.length === 0) return 'Ninguna'
    return `${allowed.length} de ${ALL_SECTIONS.length}`
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-sans text-lg font-semibold text-white">Usuarios</h2>
          <p className="text-sm text-white/40">
            Acceso al cotizador. Los correos @urentit.mx entran siempre; los externos solo si están aquí y activos.
          </p>
        </div>
        <button
          onClick={() => { setShowForm(v => !v); setNotice(null) }}
          className="flex shrink-0 items-center gap-2 rounded bg-gold px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light cursor-pointer"
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? 'Cancelar' : 'Nuevo usuario'}
        </button>
      </div>

      {notice && (
        <p className="mb-4 rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">{notice}</p>
      )}
      {error && (
        <p className="mb-4 rounded border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      {/* Alta de usuario */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onCreate)}
          className="mb-8 grid grid-cols-1 gap-4 rounded border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <label className={labelCls}>Nombre *</label>
            <input {...register('name')} placeholder="Nombre y apellido" className={inputCls} />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Correo *</label>
            <input {...register('email')} type="email" placeholder="correo@ejemplo.com" className={inputCls} />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Comisión</label>
            <select {...register('comision')} className={selectCls}>
              {COMISION_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Contraseña (externos)</label>
            <input
              {...register('password')}
              type="text"
              autoComplete="off"
              placeholder="Opcional, mín. 8 caracteres"
              className={inputCls}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col justify-end gap-2.5 pb-1">
            <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
              <input type="checkbox" {...register('admin')} className="accent-gold" />
              Administrador
            </label>
            <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
              <input type="checkbox" {...register('invitar')} className="accent-gold" />
              Enviar invitación por correo
            </label>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60 cursor-pointer"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
              {saving ? 'Guardando...' : 'Crear usuario'}
            </button>
          </div>
        </form>
      )}

      {/* Tabla */}
      {users === null ? (
        <div className="flex items-center justify-center py-16 text-white/30">
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : users.length === 0 && !error ? (
        <div className="rounded border border-dashed border-white/10 py-14 text-center">
          <p className="text-sm text-white/40">Aún no hay usuarios registrados.</p>
          <p className="mt-1 text-xs text-white/25">Crea el primero con el botón &ldquo;Nuevo usuario&rdquo;.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-white/10">
          <table className="w-full min-w-[980px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wide text-white/40">
                <th className="px-4 py-3 font-medium">Usuario</th>
                <th className="px-4 py-3 font-medium">Comisión</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acceso</th>
                <th className="px-4 py-3 font-medium">Secciones</th>
                <th className="px-4 py-3 font-medium">Cotizaciones</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <Fragment key={u.id}>
                <tr className={clsx('border-b border-white/5 last:border-0', !u.active && 'opacity-45')}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{u.name}</p>
                    <p className="text-xs text-white/40">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={String(u.comision)}
                      disabled={busyId === u.id}
                      onChange={e => patch(u.id, { comision: parseFloat(e.target.value) })}
                      className="rounded border border-white/10 bg-[#1c1c1c] px-2 py-1.5 text-xs text-white focus:border-gold/50 focus:outline-none cursor-pointer"
                    >
                      {COMISION_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      {!COMISION_OPTS.some(o => parseFloat(o.value) === u.comision) && (
                        <option value={String(u.comision)}>{(u.comision * 100).toFixed(2)}%</option>
                      )}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {u.admin ? (
                      <span className="inline-flex items-center gap-1.5 rounded bg-gold/10 px-2 py-1 text-xs font-medium text-gold">
                        <ShieldCheck size={12} /> Admin
                      </span>
                    ) : (
                      <span className="text-xs text-white/40">Usuario</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx('text-xs font-medium', u.active ? 'text-green-400' : 'text-red-400')}>
                      {u.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {u.email.endsWith('@urentit.mx') && (
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
                          Google
                        </span>
                      )}
                      {u.hasPassword && (
                        <span className="rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold/80">
                          Contraseña
                        </span>
                      )}
                      {!u.email.endsWith('@urentit.mx') && !u.hasPassword && (
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
                          Google (externo)
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-white/30">
                      {u.lastLoginAt
                        ? `Último: ${METHOD_LABELS[u.lastLoginMethod ?? ''] ?? u.lastLoginMethod} · ${fmtLastLogin(u.lastLoginAt)}`
                        : 'Sin accesos registrados'}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {u.admin ? (
                      <span className="text-xs text-white/40">Todas (admin)</span>
                    ) : (
                      <button
                        onClick={() => setMatrixId(matrixId === u.id ? null : u.id)}
                        className="flex items-center gap-1.5 rounded border border-white/10 px-2.5 py-1.5 text-xs text-white/60 transition-colors hover:border-gold/40 hover:text-gold cursor-pointer"
                      >
                        <LayoutGrid size={12} />
                        {sectionSummary(u)}
                        <ChevronDown size={12} className={clsx('transition-transform', matrixId === u.id && 'rotate-180')} />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/50">{u._count.quotes}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        disabled={busyId === u.id}
                        onClick={() => { setPwdId(pwdId === u.id ? null : u.id); setPwdValue('') }}
                        title={u.hasPassword ? 'Cambiar contraseña' : 'Asignar contraseña'}
                        className={clsx(
                          'rounded border border-white/10 p-1.5 transition-colors cursor-pointer disabled:opacity-40',
                          u.hasPassword ? 'text-gold/70 hover:border-gold/40 hover:text-gold' : 'text-white/40 hover:border-gold/40 hover:text-gold',
                        )}
                      >
                        <KeyRound size={14} />
                      </button>
                      <button
                        disabled={busyId === u.id}
                        onClick={() => patch(u.id, { admin: !u.admin })}
                        title={u.admin ? 'Quitar admin' : 'Hacer admin'}
                        className="rounded border border-white/10 p-1.5 text-white/40 transition-colors hover:border-gold/40 hover:text-gold cursor-pointer disabled:opacity-40"
                      >
                        <ShieldCheck size={14} />
                      </button>
                      <button
                        disabled={busyId === u.id}
                        onClick={() => patch(u.id, { active: !u.active })}
                        title={u.active ? 'Desactivar' : 'Reactivar'}
                        className={clsx(
                          'rounded border border-white/10 p-1.5 transition-colors cursor-pointer disabled:opacity-40',
                          u.active
                            ? 'text-white/40 hover:border-red-400/40 hover:text-red-400'
                            : 'text-white/40 hover:border-green-400/40 hover:text-green-400',
                        )}
                      >
                        {u.active ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Asignar/cambiar contraseña */}
                {pwdId === u.id && (
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td colSpan={8} className="px-4 py-4">
                      <p className="mb-3 text-xs text-white/40">
                        {u.hasPassword ? 'Cambiar' : 'Asignar'} contraseña de acceso para{' '}
                        <span className="text-white/70">{u.email}</span>. Mínimo 8 caracteres.
                        Anótala antes de guardar: no se puede consultar después.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          value={pwdValue}
                          onChange={e => setPwdValue(e.target.value)}
                          placeholder="Nueva contraseña"
                          autoComplete="off"
                          className="w-64 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 focus:border-gold/50 focus:outline-none transition-colors font-mono"
                        />
                        <button
                          onClick={generatePassword}
                          className="rounded border border-white/10 px-3 py-2 text-xs text-white/60 transition-colors hover:border-gold/40 hover:text-gold cursor-pointer"
                        >
                          Generar
                        </button>
                        <button
                          onClick={() => savePassword(u)}
                          disabled={busyId === u.id || pwdValue.length < 8}
                          className="flex items-center gap-2 rounded bg-gold px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-40 cursor-pointer"
                        >
                          {busyId === u.id ? <Loader2 size={13} className="animate-spin" /> : <KeyRound size={13} />}
                          Guardar contraseña
                        </button>
                        <button
                          onClick={() => { setPwdId(null); setPwdValue('') }}
                          className="rounded border border-white/10 px-3 py-2 text-xs text-white/40 transition-colors hover:text-white/70 cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Matriz de secciones (solo usuarios no-admin) */}
                {matrixId === u.id && !u.admin && (
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td colSpan={8} className="px-4 py-4">
                      <p className="mb-3 text-xs text-white/40">
                        Secciones del cotizador visibles para <span className="text-white/70">{u.email}</span>.
                        Con todas marcadas el usuario tiene acceso completo. El cambio aplica en su próximo inicio de sesión.
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
                        {ALL_SECTIONS.map(section => {
                          const allowed = parseAllowedSections(u.allowedSections)
                          const checked = allowed === null || allowed.includes(section)
                          return (
                            <label
                              key={section}
                              className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={busyId === u.id}
                                onChange={() => toggleSection(u, section)}
                                className="accent-gold w-4 h-4"
                              />
                              {SECTION_LABELS[section]}
                            </label>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
