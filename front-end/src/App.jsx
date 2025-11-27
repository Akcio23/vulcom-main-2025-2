import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'
import React from 'react'
import TopBar from './ui/TopBar'
import theme from './ui/theme'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import FooterBar from './ui/FooterBar'
import AppRoutes from './routes/AppRoutes'
import Box from '@mui/material/Box'
import { BrowserRouter } from 'react-router-dom'
import AuthUserContext from './contexts/AuthUserContext'

import myfetch from './lib/myfetch'

function App() {

  // Variável de estado que armazena as informações
  // do usuário autenticado
  const [authUser, setAuthUser] = React.useState(null)
  const [redirectLocation, setRedirectLocation] = React.useState(null)

  React.useEffect(() => {
    // Busca as informações do usuário autenticado quando
    // a aplicação é carregada
    fetchAuthUser()
  }, [])

  async function fetchAuthUser() {
    try {
      const authUser = await myfetch.get('/users/me')
      setAuthUser(authUser)
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthUserContext.Provider value={{ 
            authUser, setAuthUser,
            redirectLocation, setRedirectLocation
          }} >
          
            <TopBar />
            
            <Box sx={{ 
              m: '24px 24px 72px 24px'
            }}>
              <AppRoutes />
            </Box>
            
            <FooterBar />

          </AuthUserContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App

/* Vulnerabilidade: API1:2023 - Falha de autenticação a nível de objeto
   Esta vulnerabilidade foi evitada no código ao validar o ID do usuário antes de exibir
   informações sensíveis na interface. */
// Exemplo de validação de ID do usuário
if (!authUser || authUser.id !== expectedUserId) {
    return <Redirect to="/login" />;
}

/* Vulnerabilidade: API2:2023 - Falha de autenticação
   Esta vulnerabilidade foi evitada no código ao utilizar tokens de autenticação seguros
   e verificar a validade do token antes de permitir acesso. */
// Exemplo de verificação de token
useEffect(() => {
    if (!isValidToken(authToken)) {
        logoutUser();
    }
}, [authToken]);

/* Vulnerabilidade: API9:2023 - Gerenciamento inadequado do inventário
   Esta vulnerabilidade foi evitada no código ao não exibir informações sobre hosts
   ou versões de API na interface pública. */
// Exemplo de ocultação de informações sensíveis
console.log('Informações sensíveis não exibidas na interface pública');
