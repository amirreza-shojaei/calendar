import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const calendardisplay = document.body;
const View = ReactDOM.createRoot(calendardisplay);
View.render(<React.StrictMode> <App /> </React.StrictMode>);