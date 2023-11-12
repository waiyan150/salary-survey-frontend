import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function SalarySurveryList() {
    const initialized = React.useRef(false);
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' }
    const [searchResults, setSearchResults] = React.useState(0);
    const [salarySurveyList, setSalarySurveyList] = React.useState([]);
    const [results, setResults] = React.useState([]);
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

    return (
        // salarySurveyList.length > 0 ? null :
        <Container>
            <h1>Search</h1>
            <Paper elevation={3} style={paperStyle}>
                {salarySurveyList.map(salarySurvery => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={salarySurvery.id}>
                        Id : {salarySurvery.id} <br />
                        Timestamp : {salarySurvery.timestamp} <br />
                        Employer : {salarySurvery.employer}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
