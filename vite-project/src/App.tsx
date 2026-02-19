import React, { type ChangeEvent } from 'react'
import './App.css'

interface IForm {
  name: string;
  email: string;
  role: string;
  terms: string;
}

interface ValidationType {
  message: string;
  alterNativeMessage?: string
  isRequired: boolean,
  regex?: RegExp
  minLength?: number
}

function App() {
  const [formCount, setFormCount] = React.useState<number>(1);
  const [errorState, setErrorState] = React.useState<IForm>({
    name: '',
    email: '',
    role: '',
    terms: ''
  })
  const [formState, setFormState] = React.useState<IForm>({
    name: '',
    email: '',
    role: '',
    terms: ''
  });
  const [userDetails, setUserDetails] = React.useState<IForm[]>([])
  const validation: Record<string, ValidationType> = {
    'email': {
      message: "Email is required.",
      isRequired: true,
      alterNativeMessage: "Kindly Check email Pattern",
      regex: /^[^@]+@[^@]+\.[^@]+$/
    },
    'name': {
      message: "Full Name is required",
      isRequired: true,
      minLength: 4,
      alterNativeMessage: "Name is too Short."
    },
    'role': {
      message: "Role is required",
      isRequired: true,
    },
    'terms': {
      message: "Accpect Terms and conditions",
      isRequired: true
    }
  }

  const handleValidation = (field: string, value: string) => {
    const valid = validation[field]
    let isError = {};


    if (valid.isRequired && !value) {
      isError = { field: valid.message }
      return valid.message
    }

    if (valid.regex && !valid.regex.test(value)) {
      isError = { field: valid.alterNativeMessage }
      return valid.alterNativeMessage;
    }

    if (valid.minLength && value.length < valid.minLength) {
      isError = { field: valid.alterNativeMessage }
      return valid.alterNativeMessage
    }

    setErrorState(isError)
    return ''

  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    const checkValid = handleValidation(name, value)
    setFormState((pre) => ({
      ...pre,
      [name]: value
    }));

    setErrorState((pre) => ({
      ...pre,
      [name]: checkValid
    }))
  }

  const handleNext = () => {
    setFormCount((pre) => pre + 1)
  }
  const handleBack = () => {
    setFormCount((pre) => pre - 1)
  }


  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formState).every((item) => item.trim() !== '')) {
      setFormState({
        email: "",
        name: "",
        role: '',
        terms: ''
      });
      setFormCount(1)
      setUserDetails((pre) => ([formState, ...pre]))
    }
  }

  return (
    <section className='container'>
      <div className='card'>
        <form noValidate onSubmit={handleSubmit} className='form-container'>
          {formCount === 1 ? (
            <>
              <div className="input-wrapper">
                <label id='name'>Full Name</label>
                <input type="text" id='name' name='name' onChange={handleInputChange} value={formState.name} />
                {errorState.name && (
                  <span className='error'>{errorState.name}</span>
                )}
              </div>
              <div className="input-wrapper">
                <label id='email'>Email</label>
                <input type="email" id='email' name='email' onChange={handleInputChange} value={formState.email} />
                {errorState.email && (
                  <span className='error'>{errorState.email}</span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="input-wrapper">
                <label id='role'>Role</label>
                <select name='role' onChange={handleInputChange} value={formState.role} >
                  <option>--Select Role--</option>
                  {['Developer', 'Designer', 'Manager'].map(role => (
                    <option key={`user-role-liest-${role}`} value={role.toLowerCase()}>{role}</option>
                  ))}
                </select>
                {errorState.role && (
                  <span className='error'>{errorState.role}</span>
                )}
              </div>
              <div className="checbox-wrapper">
                <input type="checkbox" id='terms' name='terms' onChange={handleInputChange} checked={Boolean(formState.terms)} value={formState.terms ? 'Yes' : 'No'} />
                <label id='terms'>Terms & Conditions</label>
                {errorState.terms && (
                  <span className='error'>{errorState.terms}</span>
                )}
              </div>
            </>
          )}

          <div className="btn-container">
            {formCount === 1 && (
              <button type="button" onClick={handleNext}>Next</button>
            )}

            {formCount === 2 && (
              <>
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit">Submit</button>
              </>
            )}
          </div>
        </form>
      </div>
      {userDetails.length > 0 && userDetails.map((item) => (
        <div className="card summary-container">
          <div className="user-details">
            Name : {item.name}
          </div>
          <div className="user-details">
            Email : {item.email}
          </div>
          <div className="user-details">
            Role : {item.role}
          </div>
          <div className="user-details">
            Terms & Conditions : {item.terms}
          </div>
        </div>
      ))}
    </section>
  )
}

export default App
