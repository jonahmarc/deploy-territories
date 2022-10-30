import React from 'react';
import axios from 'axios';

import './home.styles.css';
import { Button, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Home() {
    const [territoryList, setTerritoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if(loading) {
            axios.get('https://netzwelt-devtest.azurewebsites.net/Territories/All')
            .then( (result) => {
                setTerritoryList(result.data.data)
                setLoading(false)
                setSort(true)
            })
            .catch( (error) => {
                setError(error.message)
            });
        }

        if(sort) {
            territoryList.forEach((territory, i, self) => {
            
                if (territory.parent != null) {
                    var id = territory.parent
                    var parent = territoryList.find(territory => territory.id == id);
                    var index = territoryList.findIndex(territory => territory.id == id);
                    
                    if (!('children' in parent)) {
                        self[index]['children'] = [];
                    }
                    
                    var currTerritory = territory.id;
                    
    
                    var check = self[index]['children'].find(territory => territory.id == currTerritory);
    
                    if(!check) {
                        self[index]['children'].push(territory)
                    }
                }
            })
            setSort(false)
        }

    }, [territoryList, loading, sort, error])

    

    
    function renderNestedTerritory(territory) {

        if ('children' in territory) {
            return (
                <>

                <details className='ms-3'>
                    <summary>{territory.name}</summary>
                    <span className=''>
                                {
                                territory.children.map((territory) => (
                                    renderNestedTerritory(territory)
                                ))
                            }
                    </span>
                </details>
                
                </>
            );
        }
        else {
            return (
                <>
                <span className='ms-3'>{territory.name}</span>
                <br />
                </>
            );
        }

    }

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }


    return (
        <Stack className='home_container' direction='horizontal'>
            <div className="left">
                <h1>Territories</h1>
                <h6>Here are the list of territories.</h6>
                <ul className=''>
                    {
                        territoryList.map((territory) => (

                            territory.parent == null ? renderNestedTerritory(territory) : ''
                        ))
                    }
                </ul>
            </div>
            <div className="right">
                <Button size='small' variant='outline-primary' onClick={handleLogout}>LOGOUT</Button>
                { error && <h6 style={{color: 'red'}} >{error}</h6>}
            </div>
        </Stack>
    );
}

export default Home;