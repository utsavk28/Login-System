import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const Homepage = () => {
    const history = useHistory()
    const classes = useStyles();

    const myStorage = window.localStorage;
    useEffect(() => {
        if (myStorage.getItem('token') === 'null') {
            history.push('/register')
        }
    })

    function logOutFunction() {
        localStorage.setItem('token', null);
        history.push('/login')
    }

    return (<div className="homepage-container">
        <div className="homepage-container d-flex h-100 text-center text-white bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <div>
                        <h3 class="float-md-start mb-0">Login System</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/register">Register</a>
                            <a className="nav-link" href="/login">Login</a>
                        </nav>
                    </div>
                </header>

                <main className="px-3">
                    <h1>Welcome to Main Page!</h1>
                    <p className="lead">Congratulations on Reaching the main Page,but Sorry there is nothing to see here!!</p>
                    <p className="lead">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={logOutFunction}
                        >
                            Log Out
                        </Button>
                    </p>
                </main>

                <footer className="mt-auto text-white-50">
                    <p>Code on <a href="https://getbootstrap.com/" className="text-white">Github</a>, by <a href="https://github.com/utsavk28" className="text-white">@utsav</a>.</p>
                </footer>
            </div>
        </div>
    </div>)
}

export default Homepage
