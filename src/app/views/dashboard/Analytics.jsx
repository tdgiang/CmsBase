import React, { useState, useEffect } from 'react'
import { Grid, Card } from '@material-ui/core'
import CustomLineChart from './shared/CustomLineChart'
import StatCards from './shared/StatCards'
import { useTheme } from '@material-ui/styles'
import { urlDashboard } from 'app/apis/Functions/dashboard'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'app/redux/actions/loadingAction'
import { toast } from 'react-toastify'
import KEY from 'app/assets/Key'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
 
const Analytics = (props) => {
    const theme = useTheme()
    const [list, setList] = useState()
    const history = useHistory()

    

    const { t } = useTranslation()

   
    return (
        <div className="analytics m-sm-20">
            <Grid container spacing={3} className="mb-3">
                <StatCards list={list} />
                {/* {moneyOut.length > 0 ? (
                    <Grid item xs={12} md={12} spacing={3}>
                        <div style={{ marginTop: 50 }}>
                            <CustomLineChart
                                dayShow={dayShow}
                                moneyOut={moneyOut}
                                moneyInput={moneyInput}
                            />
                        </div>
                    </Grid>
                ) : null} */}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(Analytics)
