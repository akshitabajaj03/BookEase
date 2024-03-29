import React, { useState } from 'react'
import "./Header.css";
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { DateRange } from 'react-date-range';
  import { format } from "date-fns";
  import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

const Header = ({type}) => {
 const [date, setDate] = useState([{
    startDate : new Date(),
    endDate: new Date(),
    key: 'selection',
 }]);

 const [openDate, setOpenDate] = useState(false);
 const [openCount,setOpenCount] = useState(false);
 const [options, setOpenOptions] = useState({
    adult:1,
    children:0,
    room:1,
 });

 const handleOption = (name, action) =>{
     setOpenOptions(prev => {return{
         ...prev, [name] : action === "i" ? options[name]+1: options[name]-1 
     }})   
 }

  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className='headerList'>
        <div className="headerListItem active">
        <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
            </div>
        </div>
        {type !== "list" && (
        <>
        <h1 className='headerTitle'>A lifetime of discounts? It's Genius.</h1>
        <p className='headerDesc'> Get rewarded for your travels – unlock instant savings of 10% or more with a free BookEase account</p>
        <button className='headerButton'>Sign in/ Register</button>
        <div className='headerSearch'>
         <div className='headerSearchItem'>
          <FontAwesomeIcon icon ={faBed} className='headerIcon'/>
          <input type="text" placeholder='Where are you going?' className='headerSearchInput'/>
        </div>
        <div className='headerSearchItem'>
          <FontAwesomeIcon icon ={faCalendarDays} className='headerIcon'/>
          <span  onClick = {() => setOpenDate(!openDate)} className='headerSearchText'> {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
          { openDate && <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className='date'/> }
        </div>
        <div className='headerSearchItem'>
           <FontAwesomeIcon icon ={faPerson} className='headerIcon'/>
           <span className='headerSearchText' onClick={ () =>{setOpenCount(!openCount)}}>{`${options.adult} adult . ${options.children} children . ${options.room} room `}</span>
            {openCount && <div className='options'>
                <div className='optionItem'>
                    <span className='optionText'>Adult</span>
                    <div className='optioncont'>
                    <button className='optionCounterButton' onClick={() => handleOption("adult","d")}  disabled={options.adult<=1}>-</button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button className='optionCounterButton' onClick={() => handleOption("adult","i")}>+</button>
                    </div>
                </div>
                <div className='optionItem'>
                    <span className='optionText'>Children</span>
                    <div className='optioncont'>
                    <button className='optionCounterButton' onClick={() => handleOption("children","d")} disabled={options.children<=0}>-</button>
                    <span className='optionCounterNumber'>{options.children}</span>
                    <button className='optionCounterButton' onClick={() => handleOption("children","i")}>+</button>
                    </div>
                </div>
                <div className='optionItem'>
                    <span className='optionText'>Room</span>
                    <div className='optioncont'>
                    <button className='optionCounterButton' onClick={() => handleOption("room","d")} disabled={options.room<=1}>-</button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button className='optionCounterButton' onClick={() => handleOption("room","i")}>+</button>
                    </div>
                </div>
            </div>}
        </div>
        <div className='headerSearchItem'>
            <button className='headerBtn'>Search</button>
        </div>
        </div>
        </> 
        )}
     </div>
    </div>
  )
}

export default Header