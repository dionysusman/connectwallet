import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import { Styles } from './styles'

const Counter = () => {

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        let delta = moment(new Date('2021-12-16')).diff(Date.now(), 'seconds');
        if (delta > 0) {
            setInterval(() => {
                startCounter()
            }, 1000)
        } else {
            setDays("00")
            setHours("00")
            setMinutes("00")
            setSeconds("00")
        }
    }, [])

    const startCounter = () => {
        let delta = moment(new Date('2021-12-16')).diff(Date.now(), 'seconds');
        let d = Math.floor(delta / 86400);
        if (parseInt(d) < 10) {
            d = "0" + d
        }
        setDays(d)
        delta -= d * 86400;

        let h = Math.floor(delta / 3600);
        if (parseInt(h) < 10) {
            h = "0" + h
        }
        setHours(h)
        delta -= h * 3600;

        let m = Math.floor(delta / 60);
        if (parseInt(m) < 10) {
            m = "0" + m
        }
        setMinutes(m)
        delta -= m * 60
        if (parseInt(delta) < 10) {
            delta = "0" + delta
        }

        setSeconds(delta)
    }

    return (
        <Styles>
            <div className="counter-wrapper">
                <div className="container ">
                    <Row className="mx-0 py-2">
                        <Col className="d-flex justify-content-center align-items-center">
                            <div className="counter-box p-3 mx-1 color-white bold Tanker">
                                <div>{days}</div>
                                <div className="text mt-1">Days</div>
                            </div>
                            <div className="counter-box p-3 mx-1 color-white bold Tanker">
                                <div>{hours}</div>
                                <div className="text mt-1">Hours</div>
                            </div>
                            <div className="counter-box p-3 mx-1 color-white bold Tanker">
                                <div>{minutes}</div>
                                <div className="text mt-1">Minutes</div>
                            </div>
                            <div className="counter-box p-3 mx-1 color-white bold Tanker">
                                <div>{seconds}</div>
                                <div className="text mt-1">Seconds</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Styles>
    )
}

export default Counter