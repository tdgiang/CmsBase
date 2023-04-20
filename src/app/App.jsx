import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'

import { Store } from './redux/Store'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'

import AuthGuard from './auth/AuthGuard'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Custom from './styles/Custom.css'
import DateFnsUtils from '@date-io/date-fns'
import deLocale from 'date-fns/locale/vi'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import '../i18n'

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                <Provider store={Store}>
                    <SettingsProvider>
                        <MatxTheme>
                            <GlobalCss />
                            <React.Suspense fallback={'Loading ...'}>
                                <BrowserRouter
                                    basename={process.env.PUBLIC_URL}
                                >
                                    <Router history={history}>
                                        <AuthProvider>
                                            <MatxSuspense>
                                                <Switch>
                                                    {sessionRoutes.map(
                                                        (item, i) => (
                                                            <Route
                                                                key={i}
                                                                path={item.path}
                                                                component={
                                                                    item.component
                                                                }
                                                            />
                                                        )
                                                    )}
                                                         
                                                         
                                                    
                                                  
                                                   
                                                    <AuthGuard>
                                                        <MatxLayout />
                                                    </AuthGuard>
                                                </Switch>
                                            </MatxSuspense>
                                        </AuthProvider>
                                    </Router>
                                </BrowserRouter>
                            </React.Suspense>
                        </MatxTheme>
                    </SettingsProvider>
                    <ToastContainer
                        position="top-right"
                        style={{ fontSize: 16 }}
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        transition={Slide}
                    />
                </Provider>
            </MuiPickersUtilsProvider>
        </AppContext.Provider>
    )
}

export default App
