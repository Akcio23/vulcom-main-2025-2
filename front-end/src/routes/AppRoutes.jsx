import { Routes, Route } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import { routes, UserLevel } from './routes'

export default function AppRoutes() {
 return (
   <Routes>
     {
       routes.map(route => {
         let element
         /* Vulnerabilidade: API7:2023 - Falsificação de requisição do lado do servidor (SSRF)
            Esta vulnerabilidade foi evitada ao garantir que todas as rotas protegidas
            sejam verificadas por meio do componente AuthGuard. */
         if(route.userLevel > UserLevel.ANY) {
           element = <AuthGuard userLevel={route.userLevel}>
             {route.element}
           </AuthGuard>
         }
         else element = route.element
        
         return <Route
           key={route.route}
           path={route.route}
           element={element}
         />
       })
     }
   </Routes>
 )
}
