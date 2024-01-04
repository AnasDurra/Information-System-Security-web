import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './hooks/AuthContext.jsx';
import { ConfigProvider } from 'antd';
import { router } from './routes/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { StudentProvider } from './hooks/StudentsContext.jsx';
import { SubjectProvider } from './hooks/SubjectsContext.jsx';
import { DescriptionProvider } from './hooks/DescriptionsContext.jsx';
import { CertificateProvider } from './hooks/CertificateContext.jsx';
import { PasswordProvider } from './hooks/passwordContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00474f',
        components: {
          Layout: {
            //  headerBg: '#f6ffed',
          },
        },
      },
    }}
  >
    <AuthProvider>
      <StudentProvider>
        <SubjectProvider>
          <DescriptionProvider>
            <CertificateProvider>
              <PasswordProvider>
                <RouterProvider router={router} />
              </PasswordProvider>

            </CertificateProvider>
          </DescriptionProvider>
        </SubjectProvider>
      </StudentProvider>
    </AuthProvider>
  </ConfigProvider>
);
