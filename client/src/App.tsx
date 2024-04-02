import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/HomePage'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HorizontalNavigationBar from '../src/components/HorizontalNavigationBar'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
//import ProjectPage from './pages/ProjectPage/ProjectPage'
import GoogleUserProvider from './contexts/GoogleUserContext'
import ProjectsWrapper from './components/ProjectsWrapper'
import AllProjectsPage from './pages/AllProjectsPage/AllProjectsPage'
import CreateProjectPage from './pages/CreateProjectPage/CreateProjectPage'
import Footer from './components/Footer/Footer'

function App() {
  //Kolla dynamic routes för exempelvis projects/:id osv
  return (
    <GoogleOAuthProvider clientId="1042069757026-b4e19qjujfve9jl6e8u7sjlk34m6kb0n.apps.googleusercontent.com">
      <GoogleUserProvider>
      <HorizontalNavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/projects" element={<ProjectsWrapper />}/>
        <Route path="/allprojects" element={<AllProjectsPage/>}/>
        <Route path='/createproject' element={<CreateProjectPage/>}/>
        <Route path="/projects/:projectId" element={<ProjectsWrapper/>}/>
      </Routes>
      </GoogleUserProvider>
    </GoogleOAuthProvider>
  )
}

export default App
