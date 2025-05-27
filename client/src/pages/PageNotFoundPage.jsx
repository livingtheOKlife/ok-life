import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

import MainWrapper from '../components/shared/MainWrapper'

function PageNotFoundPage() {
  return (
    <MainContainer page='page-not-found-page'>
      <MainWrapper style={{ height: '100%' }}>
        <h2>Oops!</h2>
        <span style={{ maxWidth: '280px', textAlign: 'center' }}>The page you are trying to find does not exist...</span>
        <Link to='/' style={{ padding: '0.25rem', marginTop: '1rem' }}>Continue exploring</Link>
      </MainWrapper>
    </MainContainer>
  )
}

export default PageNotFoundPage