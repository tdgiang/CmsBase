import React from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { toPriceVnd } from 'app/config/Function'
const useStyles = makeStyles(({ palette, ...theme }) => ({
    icon: {
        fontSize: '44px',
        opacity: 0.6,
        color: palette.primary.main,
    },
}))

const StatCards = ({ list }) => {
    const classes = useStyles()

    return (
        <>
            {list && (
                <Grid container spacing={1} className="mb-3">
                    <Grid
                        container
                        item
                        sm={12}
                        lg={12}
                        md={12}
                        spacing={1}
                        className="flex"
                    >
                        <Grid item xs={3} md={3}>
                            <Link to="/customer">
                                <Card
                                    className=" p-sm-24 bg-paper cursor-pointer"
                                    elevation={6}
                                    style={{
                                        height: ' 150px',
                                        color: 'white',
                                        backgroundColor: '#00A2B7',
                                    }}
                                >
                                    <h6>Số khách hàng mới đăng ký:</h6>

                                    <h4 className="flex items-center">
                                        <strong>{list.new_customer}</strong>
                                    </h4>
                                    <h6>Số HĐ đầu tư mới:</h6>

                                    <h4 className="flex items-center">
                                        <strong>{list.new_contract}</strong>
                                    </h4>
                                </Card>
                            </Link>
                        </Grid>

                        <Grid item xs={3} md={3}>
                            <Link to="/utilities/sms">
                                <Card
                                    className=" p-sm-24 bg-paper cursor-pointer"
                                    elevation={6}
                                    style={{
                                        height: ' 150px',
                                        color: 'white',
                                        backgroundColor: '#3478ED',
                                    }}
                                >
                                    <h6>Số SMS chăm sóc 7 ngày</h6>

                                    <h4 className="flex items-center">
                                        <strong>{list.total_sms}</strong>
                                    </h4>
                                    <h6>Số lượng Email chăm sóc 7 ngày</h6>

                                    <h4 className="flex items-center">
                                        <strong>{list.total_email}</strong>
                                    </h4>
                                </Card>
                            </Link>
                        </Grid>

                        <Grid item xs={3} md={3}>
                            <Link to="/invest-contract">
                                <Card
                                    className=" p-sm-24 bg-paper cursor-pointer"
                                    elevation={6}
                                    style={{
                                        height: ' 150px',
                                        color: 'white',
                                        backgroundColor: '#4437C8',
                                    }}
                                >
                                    <h6>Số lượng HĐ chờ khớp lệnh</h6>

                                    <h4 className="flex items-center">
                                        <strong>
                                            {list.total_contract_new}
                                        </strong>
                                    </h4>
                                    <h6>Số lượng HĐ đến kỳ trả lãi</h6>

                                    <h4 className="flex items-center">
                                        <strong>
                                            {list.total_contract_interest}
                                        </strong>
                                    </h4>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Link to="/invest-trans">
                                <Card
                                    className=" p-sm-24 bg-paper cursor-pointer"
                                    elevation={6}
                                    style={{
                                        height: ' 150px',
                                        color: 'white',
                                        backgroundColor: '#F1895C',
                                    }}
                                >
                                    <h6>Số lượng HĐ sắp tất toán</h6>

                                    <h4 className="flex items-center">
                                        <strong>
                                            {list.total_contract_finish}
                                        </strong>
                                    </h4>
                                    <h6>Số lượng yêu cầu rút tiền </h6>

                                    <h4 className="flex items-center">
                                        <strong>
                                            {toPriceVnd(
                                                list.total_pull_cash,
                                                true
                                            )}{' '}
                                            VNĐ
                                        </strong>
                                    </h4>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default StatCards
