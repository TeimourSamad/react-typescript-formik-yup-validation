import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import './App.css';
import BackgroundImage from './assets/background-illustration.png'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import BulbOn from './assets/bulb-on.svg'
import BulbOff from './assets/bulb-off.svg'
import * as Yup from 'yup'


interface FormModel {
  name: string,
  lastname: string,
  email: string,
  password: string,
  confirmPassword: string
}

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
      "Password must contain minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})


const App = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<Object>([])
  const handleVisibilityButton = (password: string) => {
    if (password == 'password') {
      setIsPasswordVisible(prev => !prev)
    } else {
      setIsConfirmPasswordVisible(prev => !prev)
    }
  }

  console.log(JSON.stringify(formValues))

  const handleTheme = () => {
    setIsDark(prev => !prev)
  }

  document.body.style.background = isDark ? '#222' : 'white'

  return (
    <Formik<FormModel>
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        setFormValues(values)
      }}
    >
      {({ handleSubmit, values, handleChange, errors, touched }) => (
        <Form onSubmit={handleSubmit} className='main-form-container'>
          <h2 className='form-header' style={{ color: isDark ? 'white' : 'black', position: 'absolute', top: '10%', left: '5%', fontSize: 45, fontWeight: 500 }}>Registration Form</h2>
          <div className="form-container">
            {/* <input name='name' value={values.name} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} placeholder='Name' /> */}
            <Field name="name" placeholder='Firstname' value={values.name} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} />
            {errors.name && touched.name ? (
              <div className='error-message'>{errors.name}</div>
            ) : null}
            {/* <input name='lastname' value={values.lastname} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} placeholder='Last Name' /> */}
            <Field name="lastname" placeholder='Lastname' value={values.lastname} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} />
            {errors.lastname && touched.lastname ? (
              <div className='error-message'>{errors.lastname}</div>
            ) : null}
            {/* <input type='email' name='email' value={values.email} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} placeholder='Email' /> */}
            <Field name="email" placeholder='Email' value={values.email} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} />
            {errors.email && touched.email ? (
              <div className='error-message'>{errors.email}</div>
            ) : null}
            {/* <input name='password' value={values.password} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} type={isPasswordVisible ? 'text' : 'password'} placeholder='Password' /> */}
            <Field type={isPasswordVisible ? 'text' : 'password'} name="password" placeholder='Password' value={values.password} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} />
            {errors.password && touched.password ? (
              <div className='error-message-password'>{errors.password}</div>
            ) : null}
            <div onClick={() => handleVisibilityButton('password')} className='password-icon'>
              {isPasswordVisible ? <AiFillEyeInvisible style={{ color: isDark ? 'white' : 'black' }} /> : <AiFillEye style={{ color: isDark ? 'white' : 'black' }} />}
            </div>
            {/* <input name='confirmPassword' value={values.confirmPassword} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} type={isConfirmPasswordVisible ? 'text' : 'password'} placeholder='Confirm Password' /> */}
            <Field type={isConfirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" placeholder='Confirm Password' value={values.confirmPassword} onChange={handleChange} className={isDark ? 'form-input dark' : 'form-input'} />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className='error-message-confirm'>{errors.confirmPassword}</div>
            ) : null}
            <div onClick={() => handleVisibilityButton('confirmPassword')} className='confirm-password-icon'>
              {isConfirmPasswordVisible ? <AiFillEyeInvisible style={{ color: isDark ? 'white' : 'black' }} /> : <AiFillEye style={{ color: isDark ? 'white' : 'black' }} />}
            </div>
            <button type='submit'>Submit Form</button>
            <img onClick={handleTheme} className='bulb-icon' src={isDark ? BulbOn : BulbOff} />
          </div>
          <div className="image-container">
            <img src={BackgroundImage} className='background-form-illustration' style={{ transform: 'translateY(15%)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 0, marginBottom: 25, left: 25, marginTop: 45 }}>
            {Object.keys(formValues).length > 0 && JSON.stringify(formValues)}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
