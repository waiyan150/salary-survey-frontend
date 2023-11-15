import * as React from 'react';
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
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment';

export default function SalarySurveryList() {
    // const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' }
    const initialized = React.useRef(false);
    const [searchResults, setSearchResults] = React.useState(0);
    const [salarySurveyList, setSalarySurveyList] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [gender, setGender] = React.useState('');
    const [dateTimeFrom, setDateTimeFrom] = React.useState('');
    const [dateTimeTo, setDateTimeTo] = React.useState('');
    const [defaultSearchQuery] = React.useState('http://localhost:8080/salary-survey/survey?search=');
    var [searchQuery, setsearchQuery] = React.useState('http://localhost:8080/salary-survey/survey?search=');


    React.useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            fetch('http://localhost:8080/salary-survey/survey?search=')
                .then(response => response.json())
                .then((results) => {
                    setResults(results)
                    if (results._embedded.salarySurveyList === null) {
                        setSalarySurveyList()
                    } else {
                        setSalarySurveyList(results._embedded.salarySurveyList)
                    }
                    setSearchResults(results.page.totalElements)
                })
                .catch(error => console.error(error));
        }
    }, [searchResults])
    console.log(results)
    console.log(searchResults)

    // Search
    const handleClick = (e) => {
        e.preventDefault()
        if (gender) {
            searchQuery = `${defaultSearchQuery}gender:${gender}`;
        }
        if (dateTimeFrom) {
            searchQuery = `${searchQuery},timestamp:${dateTimeFrom}`;
        }
        if (dateTimeTo) {
            searchQuery = `${searchQuery},timestamp:${dateTimeTo}`;
        }
        console.log(searchQuery);
        fetch(searchQuery)
            .then(response => response.json())
            .then((results) => {
                setResults(results)
                setSalarySurveyList(results._embedded.salarySurveyList)
                setSearchResults(results.page.totalElements)
            })
            .catch(error => console.error(error));
        console.log(results);
    }

    // Add Gender to query
    const handleGenderChange = (event) => {
        if (event.target.value !== 'All') {
            setGender(event.target.value);
        } else {
            setGender([]);
        }
    };

    // Add date time to query
    const handleDateTimeSelect = (value) => {
        var dateTimeInput = new Date(value);
        // var formattedDateTimeInput = moment(dateTimeInput).format('YYYY-MM-DDTHH-MM-ss');
        setDateTimeFrom(dateTimeInput.valueOf());
    }

    return (
        <Container>
            <h1>Search</h1>

            <Container component={Paper}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                    <InputLabel>Gender</InputLabel>
                    <Select
                        defaultValue={'All'}
                        label="Gender"
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"All"}>All</MenuItem>
                    </Select >
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label='Timestamp'
                            ampm={false}
                            defaultValue={dayjs('2022-04-17 15:30:00')}
                            onChange={handleDateTimeSelect}
                            format='YYYY-MM-DD HH:MM:ss'
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl sx={{ m: 1 }} size="large">
                    <Button variant="contained" onClick={handleClick} size='large'>Search</Button>
                </FormControl>
            </Container>

            <br />

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
