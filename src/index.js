import React, { Fragment, useState } from 'react'
import { Formik, Field, connect } from 'formik'
import styled, { css, keyframes } from 'styled-components'
import { rgba, darken } from 'polished'
import CreditCard, { ThreedSecure, validator as validate } from './credit-card'
import Customer from './customer'
import { Visa, MasterCard, Mir } from './card-icons'

const loading = keyframes`
  from {
    transform: translateX(0);
  }
  to { 
    transform: translateX(46px);
  }
`

const RowStyles = `
`
export const Row = styled.div`
width: 100%;
position: relative;
margin-bottom: 10px;

${props => !props.empty && css`
  ${Label} {
    background: #fff;
    transform: scale(.75) translateY(-33px); // translateX(3px);
    // color: ${props.error ? 'red' : '#1D96F3'} !important;
  }
  `}

${props => props.error && css`
  ${Input} {
    border-color: red !important;

    &:focus~  {
      ${Label} {
        color: red;
      }
    } 
  }
  `}

${props => props.inline && css `
  width: calc((100% / 2) - 5px);

  &:nth-child(odd) {
    margin-right: 10px;
  }
  `}
`

const Rows = styled.div`
display: flex;
flex-flow: wrap;
`

const FieldsetElement = styled.fieldset`
border: none;
padding: 0;
margin: 0 0 30px;
width: 100%;

&:last-child {
  margin: 0;
}
`

const FieldsetTitle = styled.div`
width: 100%;
margin: 0 0 15px;
font-size: 12px;
    color: #565e66;
    letter-spacing: 1.1px;
font-weight: 700;
text-transform: uppercase;
position: relative;

&:after {
  content: '';
  clear: both;
  display: table;
}
`

const Cards = styled.div`
  position: absolute;
  right: 0;
  top: calc(50% - (32px / 2));
  
svg {
  margin: 0 0 0 5px;
}
`

export const Fieldset = ({ card = false, children, title }) => (
  <FieldsetElement>
    {title &&
      <FieldsetTitle>
	{title}
	{card &&
	  <Cards>
	    <Mir color />
	    <Visa color />
	    <MasterCard color />
	  </Cards>
	}
      </FieldsetTitle>
    }

    <Rows>
      {children}
    </Rows>
  </FieldsetElement>
)

const labelStyles = `
  background-color: transparent;
  bottom: 17px;
  box-sizing: border-box;
  color: #80868b;
  left: 8px;
  padding: 0 8px;
  transition: transform .15s cubic-bezier(.4,0,.2,1),opacity .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1);
  width: auto;
  z-index: 1;
  font-size: 16px;
  line-height: 1;
  pointer-events: none;
  position: absolute;
  transform-origin: bottom left;
  font-family: Helvetica,Arial,sans-serif;
`

export const Label = styled.label`
  ${labelStyles}
`

export const ErrorMessage = styled.div`
  ${labelStyles}
  transform-origin: bottom right;
  right: 8px;
  left: auto;
  text-align: right;
  transition: none;
  // transform: scale(.75) translateY(-33px); // translateX(3px);
  background: #fff;
  color: red;
  font-size: 12px;
  bottom: -5px;
`

const LoadingOverlay = styled.span`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -46px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: inherit;
  background: repeating-linear-gradient( -55deg, #ffffff 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 11px, #ffffff 12px, #ffffff 20px );
  animation-name: ${loading};
  animation-duration: .6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transition: opacity .2s;
`

const Submit = styled.button.attrs(() => ({
  type: 'submit',
}))`
  display: block;
  clear: both;
  border: none;
  font-size: 30px;
  // text-transform: uppercase;
  color: #fff;
  width: ${props => props.full ? '100%' : 'auto'};
  border-radius: 3px;
  // margin: 24px 0;
  transition: all .125s ease;
  background: #1d96f3;
  font-size: 16px;
  height: 48px;
  cursor: pointer;
  letter-spacing: 1px;
  padding: 0 20px;
  overflow: hidden;
  position: relative;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.loading && css`
    cursor: wait !important;
    // color: transparent;

${LoadingOverlay} {
  opacity: 0.2;
  visibility: visible;
}
  `}

`

export const Input = styled.input.attrs(({ showPlaceholder = true }) => ({
  showPlaceholder: showPlaceholder
}))`
padding: 12px 14px;  
border: 1px solid #ccc;
border-radius: 3px;
line-height: 24px;
// height: 28px;
outline: none;
display: block;
width: 100%;
box-sizing: border-box;
// margin: 2px;
font-size: 16px;
// transition: border-color .05s ease-in;

&::placeholder {
  color: #C9D3DC;
  opacity: 1;
}

${props => !props.showPlaceholder && css`
    &::placeholder {
      color: transparent;
      opacity: 0;
    }
`}

&:focus {
  border-color: #1D96F3;

  ${props => !props.showPlaceholder && css`
  &::placeholder {
    color: #C9D3DC;
    opacity: 1;
  }
  `}

  &~${Label} {
    transform: scale(.75) translateY(-33px); // translateX(3px);
    background: #fff;
    color: #1D96F3;
  } 
}

// &:after {
  //   content: '';
  //   border-radius: 4px;
  //   bottom: 0;
  //   opacity: 0;
  //   transform: none;
  //   transition: opacity 150ms cubic-bezier(0.4,0,0.2,1);
  //   width: calc(100% - 2*2px);
  //   border: 2px solid transparent;
  // }
`
const Form = styled.form`
  display: flex;
  flex-flow: wrap;

// * {
//   margin: 0;
// 	padding: 0;
// 	border: 0;
// 	font-size: 100%;
// 	font: inherit;
// 	vertical-align: baseline;
// }
`

const FormElements = styled.div`
  position: relative;
  margin: 0 0 30px;
  overflow: hidden;
`

const Blurred = styled.div`
overflow: hidden;

${FieldsetElement} {
  transition: all .2s;
}

${props => props.active && css`
  ${FieldsetElement} {
    opacity: 0.4;
    // filter: blur(2px);
    pointer-events: none;
  }

    &:after {
      display: none;
      content: '';
      // width: 100%;
      // height: 100%;
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: -46px;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient( -55deg, rgba(236, 241, 245, 1) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 11px, rgba(236, 241, 245, 1) 12px, rgba(236, 241, 245, 1) 20px );
      animation-name: ${loading};
	animation-duration: .6s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
    }
`}
`

const StatusElement = styled.div`
  position: absolute;
  top: 0;
left: 0;
width: 100%;
height: 100%;
background: ${rgba('#fff',0.6)};
z-index: 333;
`

const StatusText = styled.div`
position: relative;
top: 50%;
text-align: center;
transform: perspective(1px) translateY(-50%);
`

const Status = ({ text = 'Loading...', ...props }) => (
  <StatusElement>
    <StatusText>
      {text}
    </StatusText>
  </StatusElement>
)

const ErrorsList = styled.ul`
  list-style: none; 
  margin: 0 0 30px;
  padding: 0;
  display: block;
  width: 100%;
  clear: both;
  color: red;
    padding: 10px 14px;
    background: #fff;
    // border: 1px solid red;
    background: rgba(255, 0, 0, 0.09);
    border-radius: 3px;

li {
  line-height: 1.5;
}
`

const TotalAmount = styled.span`
  margin: 0 0 0 10px;
`

const formatError = fields => Object.keys(fields).map(field => {
	if (typeof fields[field] === 'string') {
	  return (
	    <li key={field}>{fields[field]}</li>
	  )
	}
      })

export const Errors = ({ list = null }) => {
  const fields = Object.keys(list)

  if (fields.length < 1) {
    return null
  }


  return (
    <ErrorsList>
      {fields.map(field => {
	if (typeof list[field] === 'string') {
	  return (
	    <li key={field}>{list[field]}</li>
	  )
	} else {
	  return formatError(list[field])
	}
      })}
    </ErrorsList>
  )
}

export const Forms = ({ children, total, submitText, submittingText = 'Submitting', submitFullWidth, submitting = false, ...props }) => {
  return (
  <Formik {...props}>
    {({ handleSubmit, handleReset, isValid, isSubmitting, errors }) => {
      return (
      <Form onReset={handleReset} onSubmit={handleSubmit}>
	<FormElements>
	  <Blurred active={submitting}>
	    {children}
	  </Blurred>
	  {/* submitting &&
	    <Status />
	    */}
	</FormElements>
	<Errors list={errors} />
	<Submit full={submitFullWidth} disabled={!isValid || isSubmitting} loading={submitting}>
	  {submitting ? `${submittingText}...` : submitText}
	  {total && 
	    <TotalAmount>{total}</TotalAmount>
	  }
	  <LoadingOverlay />
	</Submit>
      </Form>
      )
    }}
  </Formik>
  )
}

const FeedbackElement = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 32px;
  height: 32px;
  text-align: center;
  cursor: pointer;
  
svg {
    width: 60%;
    height: 60%;
    opacity: 0.8;
    fill: red;
    position: relative;
    top: 4px;
}
`

const FeedbackMessage = styled.span`
  position: absolute;
  width: auto;
  right: 0;
`

export const Feedback = ({ children, ...props }) => (
  <FeedbackElement>
    <svg x="0px" y="0px" viewBox="0 0 65 65">
      <g>
	<g>
		<path d="M32.5,0C14.58,0,0,14.579,0,32.5S14.58,65,32.5,65S65,50.421,65,32.5S50.42,0,32.5,0z M32.5,61C16.785,61,4,48.215,4,32.5
			S16.785,4,32.5,4S61,16.785,61,32.5S48.215,61,32.5,61z"/>
		<circle cx="33.018" cy="19.541" r="3.345"/>
		<path d="M32.137,28.342c-1.104,0-2,0.896-2,2v17c0,1.104,0.896,2,2,2s2-0.896,2-2v-17C34.137,29.237,33.241,28.342,32.137,28.342z
			"/>
	</g>
</g>
    </svg>
    <FeedbackMessage>{children}</FeedbackMessage>
  </FeedbackElement>
)
const ClearElement = styled.span`
  position: absolute;
right: 15px;
    top: calc(50% - 7px);
    display: block;
    line-height: 1;
cursor: pointer;
opacity: 0.6;
transition: all .2s;

&:hover {
  opacity: 1;
  svg {
    fill: #1D96F3;
  }
}

svg {
  width: 14px;
  height: 14px;
  transition: all .2s;
  // fill: #ccc;
}
`

export const Clear = props => (
  <ClearElement {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64">
      <g>
      <path d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/>
    </g>
  </svg>
  </ClearElement>
)

const formatCard = ({ expiry, number, cvv }) => {
  const { month, year } = validate.expirationDate(expiry) 
   
  return {
    number: number.replace(/\s+/g, ''),
    expiry: {
      month,
      year
    },
    cvv
  }
}

const CheckboxLabel = styled.label`
  width: 100%;
    min-height: 20px;
    line-height: 1.2;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    color: #8b8e94; /* #4a9c58; */
    transition: color .3s;
    display: block;
    padding: 13px 14px 12px 44px;
    border-radius: 3px;
    user-select: none;
  font-weight: 400;
    transition: all .3s;
    /*background: rgba(253, 213, 165, 0.4);*/
    border: 1px dashed #b7b7b9; /* rgba(77, 180, 94, 0.7); */

    &:hover {
        /*color: ${darken(0.1, '#7d8086')};*/
        border-color: ${darken(0.1, '#b7b7b9')};
    }

    ${props => props.error && css`
        border-color: rgba(216,67,72,0.9) !important;
        color: rgba(216,67,72, 1);

        &:before {
            border-color: rgba(216,67,72,0.9) !important;
        }
    `}

    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
    }

    &:before {
        top: 12px;
        left: 14px;
        width: 18px;
        height: 18px;
        border: 1px solid #b7b7b9;
        border-radius: 3px;
        box-shadow: none;
        z-index: 1;
        transition: background-color .2s, border-color .2s, box-shadow .2s;
        background: #fff;
    }

    &:after {
	width: 5px;
	height: 9px;
	top: 15px;
	left: 21px;
        border: 2px solid #4db45e;
        transform: rotate(35deg);
        border-left: 0;
        border-top: 0;
        opacity: 0;
        z-index: 2;
        transition: transform .2s, opacity .2s;
    }
`

const AgreementHolder = styled.div`
    margin: 0 0 15px;
`

const CheckboxInput = styled.input.attrs(() => ({
  type: 'checkbox'
}))`
    /*position: absolute;
    left: -10000px;
    top: 0;*/
    width: 1px;
    height: 1px;
    display: none;
    visibility: hidden;

    &:checked+label {
        color: #4a9c58;
        border-color: rgba(77, 180, 94, 0.7);

        &:before {
            box-shadow: none;
            border-color: rgba(77, 180, 94, 0.7);
        }

        &:after {
            opacity: 1;
        }
    }
`

const AgreementDetails = styled.span`
    display: inline-block;
    color: #4598e8;
    // border-bottom: 1px dotted #4598e8;
    transition: all .3s;
`

const validateAgreement = (value = false) => {
  let errorMessage

  if (!value) {
    errorMessage = 'Согласитесь с условиями платежей'
  }

  return errorMessage
}
const AgreementElement = ({ children }) => {
    return (
        <Fieldset>
	  <Field name="agreed" validate={validateAgreement}>
	    {({ field, form }) => (
	      <Fragment>
		<CheckboxInput {...field } checked={!!field.value} />
		<CheckboxLabel
		  error={false}
		  onClick={event => {
		    event.preventDefault()
		    form.setFieldValue('agreed', !field.value)
		  }}
		  htmlFor="agreed">
		  {children}
		</CheckboxLabel>
	      </Fragment>
	    )}
	  </Field>
        </Fieldset>
    )
}

export const Agreement = ({ children, ...props }) => {
    return (
        <AgreementElement {...props}>
	  {children ? children : 'Я согласен на автоматические ежемесячные списания для выбранной подписки'}
	      {/* <AgreementDetails>Подробнее</AgreementDetails> */}
            {/* Вы всегда сможете отменить дальнейшую оплату в настройках профиля. */}
        </AgreementElement>
    )
}
 
const Checkout = ({
  card = true,
  agreement,
  agreementText,
  threedSecureDomain,
  threedSecureCallbackName, 
  onThreedSecureComplete,
  customer = true, 
  initialValues = null, 
  onSubmit, 
  children, 
  formik, 
  ...props
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [threedSecureUrl, setThreedSecureUrl] = useState(null)

  const submit  = async (values, actions) => {
    if (typeof onSubmit !== 'function') {
      return false
    }

    setSubmitting(true)

    // console.log(actions)

    const formData = {
      ...values,
      card: formatCard(values.card)
    }
    
    const result = await onSubmit(formData, setSubmitting, setThreedSecureUrl)

    return result
    // setTimeout(() => {
    //   actions.resetForm()
    // }, 1000)

    // if (result instanceof Promise) {
    // Promise.resolve(result).then(() => setSubmitting(false))
    // }
  }

  if (!(card || customer)) {
    return null
  }

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    card: {
      number: '',
      expiry: '',
      cvv: ''
    },
  }

  const values = {
    ...defaultValues,
    ...initialValues
  }

  if (agreement) {
    values.agreed = false
  }

  // console.log(formik)

  return (
    <Forms 
      {...props}
      initialValues={values}
      onSubmit={submit}
      submitting={submitting}>
      {customer &&
	<Customer />
      }
      {card &&
	<CreditCard
	  threedSecureDomain={threedSecureDomain}
	  threedSecureCallbackName={threedSecureCallbackName}
	  threedSecure={!!threedSecureUrl}
	  threedSecureUrl={threedSecureUrl}
	  onThreedSecureComplete={(...args) => {
	    setThreedSecureUrl(false) 
	    // formik.handleReset()

	    if (typeof onThreedSecureComplete === 'function') {
	      onThreedSecureComplete(...args, () => setSubmitting(false))
	    } else {
	      setSubmitting(false)
	    }
	  }} />
      }
      {children &&
	<Fieldset>{children}</Fieldset>
      }

      {agreement &&
	<Agreement>{agreementText}</Agreement>
      }
    </Forms>
  )
}

const ConnectedCheckout = connect(Checkout)

export default Checkout
