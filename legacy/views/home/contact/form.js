/* Default */
import { useRouter } from 'next/router'

/* Bee */
import _, { Grid, Cell } from '../../../bee/grid'

/* Packages */
import jsonToFormData from '@ajoelp/json-to-formdata'

/* Hooks */
import { useCar } from '../../../hooks/car'
import { useLoading } from '../../../hooks/loading'

/* Components */
import Button from '../../../components/button'
import { dialog } from '../../../components/dialog'

/* Images */
import { Form, Field } from '../../../components/form'

export default () => {
  const { name } = useCar()
  const { setLoading } = useLoading()
  const router = useRouter()
  const initialValues = {
    name: '',
    last_name: '',
    enterprise: '',
    email: '',
    phone: '',
    vehicle: name ?? '',
    how_meet_us: '',
    token: '',
  }

  return (
    <Cell nested>
      <Form
        aria-label="Formulario para solicitar cotización de arrendamiento"
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true)
          const formData = jsonToFormData({ ...values })

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/forms/contact-form-send.php`,
            {
              method: 'POST',
              headers: {
                accept: 'application/json',
              },
              body: formData,
            }
          )
            .then((res) => res.json())
            .then((res) => {
              setLoading(false)

              if (res.errors) {
                dialog({
                  type: 'error',
                  errors: res.errors,
                })
              }

              if (res.status === 'success') {
                dialog({
                  type: 'success',
                  message: res.message,
                })
                setTimeout(() => {
                  router.reload()
                }, 500)
              }
            })
        }}
      >
        <Grid
          gridTemplateColumns={{ m: 'repeat(2, 1fr)', l: 'repeat(3, 1fr)' }}
          alignItems="stretch"
        >
          <Cell>
            <Field
              icon="user"
              name="name"
              label="Nombre*"
              placeholder="Nombre"
            />
          </Cell>
          <Cell>
            <Field
              icon="user"
              name="last_name"
              label="Apellido*"
              placeholder="Apellido"
            />
          </Cell>
          <Cell>
            <Field
              icon="building"
              name="enterprise"
              label="Empresa*"
              placeholder="Empresa"
            />
          </Cell>
          <Cell>
            <Field
              icon="envelope"
              name="email"
              type="email"
              label="Correo electrónico*"
              placeholder="Correo electrónico"
            />
          </Cell>
          <Cell>
            <Field
              icon="mobile"
              name="phone"
              type="tel"
              label="Teléfono*"
              placeholder="Teléfono"
            />
          </Cell>
          <Cell>
            <Field
              icon="car"
              name="vehicle"
              label="Vehículo de interés*"
              placeholder="Vehículo de interés"
            />
          </Cell>
          <Cell>
            <Field
              icon="comment"
              name="how_meet_us"
              label="¿Cómo te enteraste de nosotros?*"
              placeholder="¿Cómo te enteraste de nosotros?"
            />
          </Cell>
          <Cell
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            my={{ _: '1.25rem', m: '0' }}
          >
            <Button as="button" type="submit" variant="black-main" large aria-label="Enviar solicitud de cotización">
              Enviar
            </Button>
          </Cell>
          <Cell>
             <Field type="hidden" name="token" />
          </Cell>
        </Grid>
      </Form>
    </Cell>
  )
}
