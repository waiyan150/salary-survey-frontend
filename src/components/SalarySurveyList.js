import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SalarySurveryList() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' }
    const initialized = React.useRef(false);
    const [searchResults, setSearchResults] = React.useState(0);
    const [salarySurveyList, setSalarySurveyList] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [gender, setGender] = React.useState('');

    React.useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            fetch("http://localhost:8080/salary-survey/survey")
                .then(response => response.json())
                .then((results) => {
                    setResults(results)
                    setSalarySurveyList(results._embedded.salarySurveyList)
                    setSearchResults(results.page.totalElements)
                })
                .catch(error => console.error(error));
        }
    }, [])
    console.log(results)
    console.log(searchResults)

    // Search
    const handleClick = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/salary-survey/survey?search?")
            .then(response => response.json())
            .then((results) => {
                setResults(results)
                setSalarySurveyList(results._embedded.salarySurveyList)
                setSearchResults(results.page.totalElements)
            })
            .catch(error => console.error(error));
    }

    // Add Gender to query
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <Container>
            <h1>Search</h1>

            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Empty"}>Empty</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={handleClick}>Search</Button>
                    </Box>
                </Paper>
            </Container>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Timestamp</TableCell>
                            <TableCell align="right">Employer</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Job Title</TableCell>
                            <TableCell align="right">Years at Employer</TableCell>
                            <TableCell align="right">Years of Experience</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Signing Bonus</TableCell>
                            <TableCell align="right">Annual Bonus</TableCell>
                            <TableCell align="right">Annual Stock Value/Bonus</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Additional Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salarySurveyList.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.timestamp}</TableCell>
                                <TableCell align="right">{row.employer}</TableCell>
                                <TableCell align="right">{row.location}</TableCell>
                                <TableCell align="right">{row.jobTitle}</TableCell>
                                <TableCell align="right">{row.yearsAtEmployer}</TableCell>
                                <TableCell align="right">{row.yearsOfExperience}</TableCell>
                                <TableCell align="right">{row.salary}</TableCell>
                                <TableCell align="right">{row.signingBonus}</TableCell>
                                <TableCell align="right">{row.annualBonus}</TableCell>
                                <TableCell align="right">{row.annualStockValueBonus}</TableCell>
                                <TableCell align="right">{row.gender}</TableCell>
                                <TableCell align="right">{row.additionalComments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}
