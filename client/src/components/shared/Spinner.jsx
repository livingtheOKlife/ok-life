function Spinner () {
  return (
    <div className="spinner"
      style={{
        alignSelf: 'center',
        width: 'auto',
        margin: '0.5rem 0'
      }}>
      <div className="spinner-background"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40px',
          width: '40px',
          borderRadius: '50%'
        }}>
        <div className="spinner-ball"
          style={{
            position: 'absolute',
            top: '0',
            left: 'calc(50% - 3px)',
            height: '6px',
            width: '6px',
            borderRadius: '50%'
          }}></div>
        <div className="spinner-foreground"
          style={{      
            height: 'calc(100% - 12px)',
            width: 'calc(100% - 12px)',
            borderRadius: '50%'
          }}></div>
      </div>
    </div>
  )
}

export default Spinner