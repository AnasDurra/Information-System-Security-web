import React from 'react';
import {Col, Row} from "antd";
import {useNavigate} from "react-router-dom";

function ViewLandingMarks(props) {
    const navigate = useNavigate()
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            height: "100%"
        }}>
            <Row style={{width: '100%'}} justify={'space-evenly'}>
                <Col span={8}>
                    <div
                        style={cardStyle}
                        onClick={() => navigate('view')}
                    >
                        <p style={{margin: 0}}>View Subject Marks</p>
                    </div>
                </Col>
                <Col span={8}>
                    <div
                        style={cardStyle}
                        onClick={() => navigate('new')}
                    >
                        <p style={{margin: 0}}>New Marks List</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const cardStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: '1em',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}
export default ViewLandingMarks;