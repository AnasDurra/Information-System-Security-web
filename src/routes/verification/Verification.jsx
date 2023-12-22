import {
  Button,
  Card,
  Flex,
  Input,
  Result,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [userAnswer, setUserAnswer] = useState(null);
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);

  const [hasAnswered, setHasAnswered] = useState(false);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const generateRandomOperation = () => {
    const operations = ["+", "-", "*"];
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
  };

  if (number1 === null) {
    setNumber1(generateRandomNumber());
    setNumber2(generateRandomNumber());
    setOperation(generateRandomOperation());
  }

  useEffect(() => {
    let calculatedResult;
    switch (operation) {
      case "+":
        calculatedResult = number1 + number2;
        break;
      case "-":
        calculatedResult = number1 - number2;
        break;
      case "*":
        calculatedResult = number1 * number2;
        break;
      default:
        calculatedResult = "Error";
    }

    setResult(calculatedResult);
  }, [number1, number2, operation]);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === result) {
      setHasAnswered(true);
      messageApi.open({
        type: "success",
        content: "Your identity has been verified!",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "Wrong answer , please check your answer!",
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "82vh",
      }}
    >
      {contextHolder}
      <Card style={{ width: "70%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            // icon={isLoading && <Spin size="large"></Spin>}
            status={hasAnswered ? "success" : "info"}
            title="Please solve the following mathematical equation to verify your identity"
            extra={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "50%" }}>
                  <Typography.Title
                    level={2}
                  >{`${number1} ${operation} ${number2} = ?`}</Typography.Title>

                  <Input
                    value={userAnswer}
                    // disabled = {isLoading}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onPressEnter={checkAnswer}
                    placeholder="Enter your answer"
                  />
                  <Button
                    type="primary"
                    onClick={checkAnswer}
                    // loading = {isLoading}
                    style={{
                      margin: "20px 0px",
                      fontSize: "18px",
                      color: "white",
                      paddingBottom: "30px",
                      backgroundColor: "#002147",
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
