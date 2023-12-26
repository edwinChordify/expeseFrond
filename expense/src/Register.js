import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import instance from './baseURL';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      mobile: '',
      checked: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile number is required'),
    }),
    onSubmit: async (values) => {
      try {
        const registerresponse = await instance.post('/users', values);
        alert('Registration completed');
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <br />
      <div
        style={{
          width: '600px',
          marginLeft: '600px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
      >
        <h1 style={{ color: 'blue' }}>EDD-Track</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile No
            </label>
            <input
              type="text"
              className={`form-control ${formik.touched.mobile && formik.errors.mobile ? 'is-invalid' : ''}`}
              name="mobile"
              id="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="invalid-feedback">{formik.errors.mobile}</div>
            ) : null}
          </div>
          <div className="mb-3 form-check">
                    
            {formik.touched.checked && formik.errors.checked ? (
              <div className="invalid-feedback">{formik.errors.checked}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
