import * as yup from 'yup'

export const SignupValidatio = yup.object({
  name: yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Please enter your name"),
    
  email: yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
    
  password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Za-z]/, "Password must contain at least one letter")
    .required("Please enter your password"),
    
  cpassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password")
});