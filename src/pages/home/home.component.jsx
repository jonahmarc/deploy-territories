import React from 'react';

import territories from '../../assets/territories.json';

import './home.styles.css';
import { Stack } from 'react-bootstrap';
import { useState } from 'react';

function Home() {
    const [territoryList, setTerritoryList] = useState(territories.data);
    console.log(territoryList);

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


    return (
        <Stack className='home_container'>
            <h1>Territories</h1>
            <h6>Here are the list of territories.</h6>
            <ul className=''>
                {
                    territoryList.map((territory) => (

                        territory.parent == null ? renderNestedTerritory(territory) : ''
                    ))
                }
            </ul>
        </Stack>
    );
}

export default Home;