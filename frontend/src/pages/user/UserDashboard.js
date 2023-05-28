import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'

const UserDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    Irányítópult
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value={user && moment(user.createdAt).format('YYYY / MM / DD')}
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Regisztráció ideje"
                        money=''
                    />
                    <StatComponent
                        value={user && user.jobsHistory.length}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Hirdetések létrehozva"
                        money=''
                    />


                </Stack>
            </Box>

        </>
    )
}

export default UserDashboard