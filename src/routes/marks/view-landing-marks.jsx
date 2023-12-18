import React from 'react';
import {Col, Row} from "antd";

function ViewLandingMarks(props) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            height: "100%"
        }}>
            <Row style={{width: "100%"}} justify={'space-evenly'}>
                <Col span={8}>

                </Col>
                <Col span={8}>

                </Col>
            </Row>
        </div>
    );
}

export default ViewLandingMarks;