import React from 'react'
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className=''>
      <div className='mx-auto flex flex-col justify-center items-center min-h-scree'>

      <h1 className='font-semibold text-2xl'>Oops!</h1>
      <p className='font-medium text-xl'>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      </div>
    </div>
  )
}

export default ErrorPage