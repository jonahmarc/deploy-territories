import React from 'react';
import axios from 'axios';

import territories from '../../assets/territories.json';

import './home.styles.css';
import { Stack, Dropdown, DropdownButton  } from 'react-bootstrap';
import { useState } from 'react';

function Home() {
    const [territoryList, setTerritoryList] = useState(territories.data);
    console.log(territoryList);

    territoryList.forEach((territory, i, self) => {
            
            if (territory.parent != null) {
                var id = territory.parent
                var parent = territoryList.find(territory => territory.id == id);
                var index = territoryList.findIndex(territory => territory.id == id);
                // console.parent()
                // console.log(parent)
                if (!('children' in parent)) {
                    self[index]['children'] = [];
                }
                // console.log(territory)
                var currTerritory = territory.id;
                // console.log(currTerritory)

                var check = self[index]['children'].find(territory => territory.id == currTerritory);

                if(!check) {
                    self[index]['children'].push(territory)
                }
                // console.log("territory - ",territory)
                // self[index]['children'].push(territory)
                // console.log(self[index]['children'])
            }
        })

        console.log(territoryList)

    const [show, setShow] = useState(true)

    
    function renderNestedTerritory(territory) {

        if ('children' in territory) {
            return (
                    <>
                    {/* <li><span className=''>{territory.name}</span></li>
                    <ul className='"' show={false}>
                        <li className=''>
                            <span className=''>
                                    {
                                    territory.children.map((territory) => (
                                        renderNestedTerritory(territory)
                                    ))
                                }
                            </span>
                        </li>
                    </ul> */}

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

                    {/* <DropdownButton id="dropdown-basic-button" title={territory.name}>
                        <Dropdown.Item href="#/action-1">
                            {
                                territory.children.map((territory) => (
                                    renderNestedTerritory(territory)
                                ))
                            }
                        </Dropdown.Item>
                    </DropdownButton> */}
                    </>
            );
        }
        else {
            return (
                <>
                {/* <li><span className=''>{territory.name}</span>  </li> */}
                <span className='ms-3'>{territory.name}</span>
                <br />
                {/* <Dropdown.Item href="#/action-1">
                    {territory.name}
                </Dropdown.Item> */}
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

                        territory.parent == null ?
                            // (
                            //     <p>{territory.name}</p>
                            // ) 
                            renderNestedTerritory(territory)
                            : ''
                    ))
                }
            </ul>
        </Stack>
    );
}

export default Home;