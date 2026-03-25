/* Packages */
import Swal from 'sweetalert2'
import ReactHtmlParser from 'react-html-parser'

/* Bee */
import _, { Grid, Cell } from '../../bee/grid'

/* Components */
import Button from '../../components/button'

/* Styles */
import {
  Title as TitleStyled,
  Message as MessageStyled,
  ErrorList as ErrorListStyled,
  ErrorItem as ErrorItemStyled,
} from './styles'

export const Main = ({ showTitle = true, ...props }) => {
  return (
    <>
      {showTitle && (
        <Cell>
          <Title {...props} />
        </Cell>
      )}
      {props.message && !props.errors && (
        <Cell>
          <Message {...props} />
        </Cell>
      )}
      {props.errors && (
        <Cell>
          <ErrorList {...props} />
        </Cell>
      )}
      <Actions {...props} />
    </>
  )
}

const Title = ({ title, ...props }) => {
  const titleTypes = {
    error: 'Hay un problema',
    info: 'Información',
    success: 'Completado',
    warning: 'Atención',
  }

  return (
    <TitleStyled fontSize="clamp(1.25rem, 2.5vw, 1.375rem)" {...props}>
      {ReactHtmlParser(title ? title : titleTypes[props.type])}
    </TitleStyled>
  )
}

const Message = ({ message, ...props }) => (
  <MessageStyled {...props}>{ReactHtmlParser(message)}</MessageStyled>
)

const ErrorList = ({ errors, ...props }) => {
  return (
    <ErrorListStyled {...props}>
      {Object.values(errors).map((error, i) => (
        <ErrorItemStyled key={i}>{ReactHtmlParser(error)}</ErrorItemStyled>
      ))}
    </ErrorListStyled>
  )
}

const Actions = ({ confirmButton, cancelButton, closeButton }) => (
  <Grid
    flex
    flexDirection={{ _: 'column-reverse', m: 'row' }}
    gridGap={{ _: '0.625rem', m: '1.25rem' }}
    justifyContent="center"
    mt="1.25rem"
  >
    <Cell>
      {(!closeButton && <CancelButton {...cancelButton} />) || (
        <CloseButton {...closeButton} />
      )}
    </Cell>
    {confirmButton && (
      <Cell>
        <ConfirmButton {...confirmButton} />
      </Cell>
    )}
  </Grid>
)

const CancelButton = ({ cancelButton, onClick = () => {}, ...props }) => (
  <Button
    text={cancelButton?.text ?? 'Cancelar'}
    variant={cancelButton?.variant ?? 'link'}
    onClick={() => {
      onClick()
      Swal.close()
    }}
    {...props}
  />
)

const ConfirmButton = ({ confirmButton, onClick = () => {}, ...props }) => (
  <Button
    text={confirmButton?.text ?? 'Continuar'}
    variant={confirmButton?.variant ?? 'white-o-white'}
    onClick={() => {
      onClick()
      Swal.close()
    }}
    {...props}
  />
)

const CloseButton = ({ closeButton, onClick = () => {}, ...props }) => (
  <Button
    text={closeButton?.text ?? 'Cerrar'}
    variant={closeButton?.variant ?? 'link'}
    onClick={() => {
      onClick()
      Swal.close()
    }}
    {...props}
  />
)
