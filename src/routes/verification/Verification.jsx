import { Button, Card, Flex, Input, Result, Row, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authoritySocket, requestChallengeAswer } from '../../services/sockests';

const Verification = ({ equation }) => {
  console.log(equation);
  console.log(eval(equation));
  const [userAnswer, setUserAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  // const navigate = useNavigate();

  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    setResult(eval(equation));
    authoritySocket.on('certificate', onCertificateResult);

    function onCertificateResult(msg) {
      if (msg.status === 200) {
        setHasAnswered(true);
        messageApi.open({
          type: 'success',
          content: 'Your identity has been verified!',
        });
      }
    }

    return () => {
      authoritySocket.off('certificate', onCertificateResult);
    };
  }, []);

  const onClick = () => {
    console.log(parseInt(userAnswer), result);
    if (parseInt(userAnswer) === result) {
      requestChallengeAswer({ answer: parseInt(userAnswer) });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Wrong answer , please check your answer!',
      });
    }
    // if (parseInt(userAnswer) === result) {
    //   setHasAnswered(true);
    //   messageApi.open({
    //     type: 'success',
    //     content: 'Your identity has been verified!',
    //   });
    //   setTimeout(() => {
    //     navigate('/');
    //   }, 2000);
    // } else {
    //   messageApi.open({
    //     type: 'error',
    //     content: 'Wrong answer , please check your answer!',
    //   });
    // }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '82vh',
      }}
    >
      {contextHolder}
      <Card style={{ width: '70%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Result
            // icon={isLoading && <Spin size="large"></Spin>}
            status={hasAnswered ? 'success' : 'info'}
            title="Please solve the following mathematical equation to verify your identity"
            extra={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '50%' }}>
                  <Typography.Title level={2}>{equation}</Typography.Title>

                  <Input
                    value={userAnswer}
                    // disabled = {isLoading}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onPressEnter={onClick}
                    placeholder="Enter your answer"
                  />
                  <Button
                    type="primary"
                    onClick={onClick}
                    // loading = {isLoading}
                    style={{
                      margin: '20px 0px',
                      fontSize: '18px',
                      color: 'white',
                      paddingBottom: '30px',
                      backgroundColor: '#002147',
                    }}
                  >
                    Check Answer
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default Verification;
