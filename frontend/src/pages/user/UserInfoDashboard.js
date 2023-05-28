import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';



const UserInfoDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();
    return (
        <>
            <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
                <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                            Adatok
                        </Typography>
                        <hr style={{ marginBottom: "30px" }} />
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            Keresztnév: {user && user.firstName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            Vezetéknév: {user && user.lastName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            E-mail cím:  {user && user.email}
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                            Státusz: {user && user.role === 0 ? "Felhasználó" : "Admin"}
                        </Typography>

                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default UserInfoDashboard