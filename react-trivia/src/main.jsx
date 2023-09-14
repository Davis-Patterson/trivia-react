import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QuestionProvider } from 'components/QuesContxt'; // Import the QuesContxt provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuestionProvider>
      {' '}
      {/* Wrap your entire application with the QuesContxt provider */}
      <App />
    </QuestionProvider>
  </React.StrictMode>
);
