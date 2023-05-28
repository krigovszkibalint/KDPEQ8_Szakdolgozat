import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction';



const DashJobs = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction())
    }, []);


    const { jobs, loading } = useSelector(state => state.loadJobs);
    let data = [];
    data = (jobs !== undefined && jobs.length > 0) ? jobs : []


    //delete job by Id
    const deleteJobById = (e, id) => {
        console.log(id)
    }

    const columns = [

        {
            field: '_id',
            headerName: 'ID',
            width: 250,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Állás címe',
            width: 300,
        },
        {
            field: 'jobType',
            headerName: 'Kategória',
            width: 150,
            valueGetter: (data) => data.row.jobType.jobTypeName
        },
        {
            field: 'user',
            headerName: 'Felhasználó',
            width: 150,
            valueGetter: (data) => data.row.user.firstName
        },
        {
            field: 'available',
            headerName: 'Aktív',
            width: 150,
            renderCell: (values => (
                values.row.available ? "Igen" : "Nem"
            ))

        },

        {
            field: 'salary',
            headerName: 'Fizetés',
            type: Number,
            width: 150,
            renderCell: (values => (
                "HUF " + values.row.salary
            ))

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/job/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteJobById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Állások listája
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to="/admin/job/create">Create Job</Link></Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashJobs