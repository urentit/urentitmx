'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Plus, ShieldCheck, UserX, UserCheck, Mail, X } from 'lucide-react'
import { clsx } from 'clsx'

interface AdminUser {
  id:             number
  name:           string
  email:          string
  admin:          boolean
  active:         boolean
  comision:       number
  manualServices: boolean
  createdAt:      string
  _count:         { quotes: number }
}

const createSchema = z.object({
  name:     z.string().min(2, 'Mínimo 2 caracteres'),
  email:    z.string().email('Correo no válido'),
  admin:    z.boolean(),
  comision: z.string(),
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

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', email: '', admin: false, comision: '0.03', invitar: true },
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

  const patch = async (id: number, data: Partial<Pick<AdminUser, 'admin' | 'active' | 'comision'>>) => {
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
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wide text-white/40">
                <th className="px-4 py-3 font-medium">Usuario</th>
                <th className="px-4 py-3 font-medium">Comisión</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Cotizaciones</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className={clsx('border-b border-white/5 last:border-0', !u.active && 'opacity-45')}>
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
                  <td className="px-4 py-3 text-white/50">{u._count.quotes}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
