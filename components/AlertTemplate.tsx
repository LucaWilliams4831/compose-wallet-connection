function AlertTemplate({
  options,
  message
} : {
  options: any
  message: any
}) {
  let alertClassList = 'alert'
  let drawPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  switch(options.type) {
    case 'info':
      alertClassList = 'alert alert-info'
      break
    case 'warning':
      alertClassList = 'alert alert-warning'
      drawPath = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      break
    case 'success':
      alertClassList = 'alert alert-success'
      drawPath = 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
      break
    case 'error':
      alertClassList = 'alert alert-error'
      drawPath = 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
      break
    default:
      break
  }
  
  return (
    <div
      className={alertClassList}
      style={{ position: 'relative', bottom: '120px' }}
    >
      <div className="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">    
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={drawPath}></path>
        </svg>
        <label>{message}</label>
      </div>
    </div>
  )
}

export default AlertTemplate
