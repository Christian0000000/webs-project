import React from 'react';

import './Competitions.css'
import Categories1 from "../../json/Competition1.json"
import Categories2 from "../../json/Competition2.json"
import Categories3 from "../../json/Competition3.json"
import GenericTable from "../../components/GenericTable/GenericTable"

const Competitions = () => {
    const columnName = ["TeamOne"]
    return (    
        <div className='championships'>
            <div>
                <GenericTable 
                    columns={columnName} 
                    content={Categories1} 
                    title={"Competition 19:00 - 20:00"}/>
            </div>
                
            <div>
                <GenericTable 
                columns={columnName} 
                content={Categories2} 
                title={"Competition 20:00 - 21:00"}/>
            </div>

            <div>
                <GenericTable 
                columns={columnName} 
                content={Categories3} 
                title={"Competition 22:00 - 23:00"}/>
            </div>
        </div>
            
    );
  }
  
  export default Competitions;