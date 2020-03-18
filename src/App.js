import React, { useState,useEffect  } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import axios from 'axios'
import { Icon } from 'antd';
import Item from 'antd/lib/list/Item';
import './App.css'

function App() {
  const [isLoadding , setIsloadding] = useState(true
    )
  const [popupInfo, setPopupInfo] = useState(false);
  const [popupInfo1, setPopupInfo1] = useState(false);
  const [popupInfo2, setPopupInfo2] = useState(false);
  const [popupInfo3, setPopupInfo3] = useState(false);
  const [people, setPeople] = useState(false);

  const [viewport, setViewport] = useState({
    width: "100wh",
    height: "100vh",
    latitude: 19.066307, 
    longitude:  99.909027,
    zoom: 10
  });
  const [pm25InfoOne,setPm25InfoOne] = useState({ location : {latitude : 0 , longitude : 0 }, pm : 0,date : null})
  const [pm25InfoTwo,setPm25InfoTwo] = useState({ location : {latitude : 0 , longitude : 0 }, pm : 0,date : null})
  const [pm25InfoThree,setPm25InfoThree] = useState({ location : {latitude : 0 , longitude : 0 }, pm : 0,date : null})
  const [pm25InfoFour,setPm25InfoFour] = useState({ location : {latitude : 0 , longitude : 0 }, pm : 0,date : null})
  const [trackPerson,setTrackPerson] = useState({ date : null , time : null, event_code : 0,mac_addr : null,rssi:0})
  useEffect( () => {
    async function get (){
      let trackONE  = await axios.get('http://202.139.192.164/api/track_data/04')
      console.log(trackONE.data);
      
      await setTrackPerson({time : trackONE.data.ts.split(' ')[1].split('.')[0] , date : trackONE.data.ts.split(' ')[0],event_code:trackONE.data.event_code , mac_addr : trackONE.data.mac_addr , rssi : trackONE.data.rssi})
      let pm25One  = await axios.get('http://202.139.192.164/api/pm25_data/44')
      await setPm25InfoOne({ location : {name: "ศาลหลักเมือง",latitude : pm25One.data.location.latitude , longitude : pm25One.data.location.longitude }, pm : pm25One.data.pm,time : pm25One.data.ts.split('T')[1].split('+')[0] , date : pm25One.data.ts.split('T')[0]})
      let pm25Two  = await axios.get('http://202.139.192.164/api/pm25_data/45')
      await setPm25InfoTwo({ location : {name: "วัดอนาลโยทิพยาราม",latitude : pm25Two.data.location.latitude , longitude : pm25Two.data.location.longitude }, pm : pm25Two.data.pm,time : pm25Two.data.ts.split('T')[1].split('+')[0] , date : pm25Two.data.ts.split('T')[0]})
      let pm25Three  = await axios.get('http://202.139.192.164/api/pm25_data/46')
      await setPm25InfoThree({ location : { name: "วัดศรีโคมคำ",latitude : pm25Three.data.location.latitude , longitude : pm25Three.data.location.longitude }, pm : pm25Three.data.pm,time : pm25Three.data.ts.split('T')[1].split('+')[0] , date : pm25Three.data.ts.split('T')[0]})
      let pm25Four  = await axios.get('http://202.139.192.164/api/pm25_data/47')
      await setPm25InfoFour({ location : { name: "พระนาคปรก สธ", latitude : 19.031294 , longitude : 99.901908 }, pm :99,time : "12:33" , date : "01/01/2563"})
     setIsloadding(true)
    }
    get()},[]
);
  var home = [ {
    team : "04",
    latitude: 19.031294,
    longitude: 99.897926,
  },{
    team : "07",
    latitude: 19.176391,
    longitude: 99.901908,
  },{
    team : "22",
    latitude: 19.187149,
    longitude: 99.812571,
  },{
    team : "25",
    latitude: 19.187149,
    longitude: 99.88926,
  }]
  var personlist = 
    {
      latitude: 19.032236,
      longitude: 99.904305,
    }
  
    function getHOME(home) {
      return home.map(_=>{
        return (
          <>
            <Marker key="ASDASd" longitude={_.longitude} latitude={_.latitude} >
              <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'green' }}  ></i> 
            </Marker>
          </>
        )
      })
      
  }
  function getPMLocation(popupPM) {
      return (
        <>
          <Marker key="ASDASd" longitude={+popupPM.location.longitude} latitude={+popupPM.location.latitude} >
              { popupPM.pm >= 0 && 25 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'blue' }} onMouseEnter={()=>{setPopupInfo(true)}} onMouseLeave={()=>{ setPopupInfo(false)}} ></i>
              )} 
              { popupPM.pm >= 26 && 50 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'green' }} onMouseEnter={()=>{setPopupInfo(true)}} onMouseLeave={()=>{ setPopupInfo(false)}} ></i>
              )}
              { popupPM.pm >= 51 && 100 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'yellow' }} onMouseEnter={()=>{setPopupInfo(true)}} onMouseLeave={()=>{ setPopupInfo(false)}} ></i>
              )} 
              { popupPM.pm >= 101 && 200 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'orange' }} onMouseEnter={()=>{setPopupInfo(true)}} onMouseLeave={()=>{ setPopupInfo(false)}} ></i>
              )} 
              { popupPM.pm >= 201 && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'red' }} onMouseEnter={()=>{setPopupInfo(true)}} onMouseLeave={()=>{ setPopupInfo(false)}} ></i>
              )}
          </Marker>
          {popupInfo && (
            <Popup tipSize={5}
              anchor="bottom"
              longitude={+popupPM.location.longitude}
              latitude={+popupPM.location.latitude}
              onMouseLeave={() => setPopupInfo(false)}
              closeOnClick={false}>
              <p><strong>{popupPM.location.name}</strong><hr/>Date : {popupPM.date.split('-')[2]}-{popupPM.date.split('-')[1]}-{popupPM.date.split('-')[0]} <br/> Time : {popupPM.time} <br/>PM2.5: {popupPM.pm} µg/m3 <br /></p>
            </Popup>
          )}

        </>
      )
  }
  function getPMLocations(popupPM) {
    return (
      <>
        <Marker key="ASDASd" longitude={+popupPM.location.longitude} latitude={+popupPM.location.latitude} >
          { popupPM.pm >= 0 && 25 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'blue' }} onMouseEnter={()=>{setPopupInfo1(true)}} onMouseLeave={()=>{ setPopupInfo1(false)}} ></i>
              )} 
              { popupPM.pm >= 26 && 50 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'green' }} onMouseEnter={()=>{setPopupInfo1(true)}} onMouseLeave={()=>{ setPopupInfo1(false)}} ></i>
              )}
              { popupPM.pm >= 51 && 100 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'yellow' }} onMouseEnter={()=>{setPopupInfo1(true)}} onMouseLeave={()=>{ setPopupInfo1(false)}} ></i>
              )} 
              { popupPM.pm >= 101 && 200 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'orange' }} onMouseEnter={()=>{setPopupInfo1(true)}} onMouseLeave={()=>{ setPopupInfo1(false)}} ></i>
              )} 
              { popupPM.pm >= 201 && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'red' }} onMouseEnter={()=>{setPopupInfo1(true)}} onMouseLeave={()=>{ setPopupInfo1(false)}} ></i>
              )}
        </Marker>
        {popupInfo1 && (
          <Popup tipSize={5}
            anchor="bottom"
            longitude={+popupPM.location.longitude}
            latitude={+popupPM.location.latitude}
            onMouseLeave={() => setPopupInfo1(false)}
            closeOnClick={false}>
            <p><strong>{popupPM.location.name}</strong><hr/>Date : {popupPM.date.split('-')[2]}-{popupPM.date.split('-')[1]}-{popupPM.date.split('-')[0]} <br/> Time : {popupPM.time} <br/>PM2.5: {popupPM.pm} µg/m3 <br /></p>
          </Popup>
        )}

      </>
    )
}
function getPMLocationss(popupPM) {
  return (
    <>
      <Marker key="ASDASd" longitude={+popupPM.location.longitude} latitude={+popupPM.location.latitude} >
      { popupPM.pm >= 0 && 25 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'blue' }} onMouseEnter={()=>{setPopupInfo2(true)}} onMouseLeave={()=>{ setPopupInfo2(false)}} ></i>
              )} 
              { popupPM.pm >= 26 && 50 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'green' }} onMouseEnter={()=>{setPopupInfo2(true)}} onMouseLeave={()=>{ setPopupInfo2(false)}} ></i>
              )}
              { popupPM.pm >= 51 && 100 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'yellow' }} onMouseEnter={()=>{setPopupInfo2(true)}} onMouseLeave={()=>{ setPopupInfo2(false)}} ></i>
              )} 
              { popupPM.pm >= 101 && 200 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'orange' }} onMouseEnter={()=>{setPopupInfo2(true)}} onMouseLeave={()=>{ setPopupInfo2(false)}} ></i>
              )} 
              { popupPM.pm >= 201 && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'red' }} onMouseEnter={()=>{setPopupInfo2(true)}} onMouseLeave={()=>{ setPopupInfo2(false)}} ></i>
              )}
      </Marker>
      {popupInfo2 && (
        <Popup tipSize={5}
          anchor="bottom"
          longitude={+popupPM.location.longitude}
          latitude={+popupPM.location.latitude}
          onMouseLeave={() => setPopupInfo2(false)}
          closeOnClick={false}>
          <p><strong>{popupPM.location.name}</strong><hr/>Date : {popupPM.date.split('-')[2]}-{popupPM.date.split('-')[1]}-{popupPM.date.split('-')[0]} <br/> Time : {popupPM.time} <br/>PM2.5: {popupPM.pm} µg/m3 <br /></p>
        </Popup>
      )}

    </>
  )
}
function getPMLocationsss(popupPM) {
  return (
    <>
      <Marker key="ASDASd" longitude={+popupPM.location.longitude} latitude={+popupPM.location.latitude} >
      { popupPM.pm >= 0 && 25 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'blue' }} onMouseEnter={()=>{setPopupInfo3(true)}} onMouseLeave={()=>{ setPopupInfo3(false)}} ></i>
              )} 
              { popupPM.pm >= 26 && 50 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'green' }} onMouseEnter={()=>{setPopupInfo3(true)}} onMouseLeave={()=>{ setPopupInfo3(false)}} ></i>
              )}
              { popupPM.pm >= 51 && 100 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'yellow' }} onMouseEnter={()=>{setPopupInfo3(true)}} onMouseLeave={()=>{ setPopupInfo3(false)}} ></i>
              )} 
              { popupPM.pm >= 101 && 200 >= popupPM.pm && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'orange' }} onMouseEnter={()=>{setPopupInfo3(true)}} onMouseLeave={()=>{ setPopupInfo3(false)}} ></i>
              )} 
              { popupPM.pm >= 201 && (
                <i class='fas fa-map-marker-alt' style={{fontSize: '25px', color: 'red' }} onMouseEnter={()=>{setPopupInfo3(true)}} onMouseLeave={()=>{ setPopupInfo3(false)}} ></i>
              )}
      </Marker>
      {popupInfo3 && (
        <Popup tipSize={5}
          anchor="bottom"
          longitude={+popupPM.location.longitude}
          latitude={+popupPM.location.latitude}
          onMouseLeave={() => setPopupInfo3(false)}
          closeOnClick={false}>
          <p><strong>{popupPM.location.name}</strong><hr/>Date : {popupPM.date.split('-')[2]}-{popupPM.date.split('-')[1]}-{popupPM.date.split('-')[0]} <br/> Time : {popupPM.time} <br/>PM2.5: {popupPM.pm} µg/m3 <br /></p>
        </Popup>
      )}

    </>
  )
}
  function getStatusPerson(person,trackPerson) {
      return (
        <>
          <Marker key="asd" longitude={person.longitude} latitude={person.latitude} >
            { trackPerson.event_code === 255 && (
              <i class='fas fa-street-view' style={{ fontSize: '25px', color: 'red' }} onMouseEnter={()=>{setPeople(true)}} onMouseLeave={()=>{setPeople(false)}}></i>
            )}
            { trackPerson.event_code === 128 && (
              <i class='fas fa-street-view' style={{ fontSize: '25px', color: 'orange' }} onMouseEnter={()=>{setPeople(true)}} onMouseLeave={()=>{setPeople(false)}}></i>
            )}
            { trackPerson.event_code === 8 && (
              <i class='fas fa-street-view' style={{ fontSize: '25px', color: 'yellow' }} onMouseEnter={()=>{setPeople(true)}} onMouseLeave={()=>{setPeople(false)}}></i>
            )}
            { trackPerson.event_code === 0 && (
              <i class='fas fa-street-view' style={{ fontSize: '25px', color: "green" }} onMouseEnter={()=>{setPeople(true)}} onMouseLeave={()=>{setPeople(false)}}></i>
            )}
          </Marker>

          {people && (
            <Popup tipSize={5}
              anchor="bottom"
              longitude={personlist.longitude}
              latitude={personlist.latitude}
              onMouseLeave={() => setPeople(false)}
              closeOnClick={false}>
               <p><strong>{trackPerson.mac_addr}</strong><hr/>Date : {trackPerson.date.split('-')[2]}-{trackPerson.date.split('-')[1]}-{trackPerson.date.split('-')[0]} <br/> Time : {trackPerson.time}
               <br/>
               <hr/>
               {trackPerson.event_code ==255 &&(<h3 className = "App">สถานะ : สะดุดล้ม</h3>)} 
               {trackPerson.event_code ==128 && (<h3 className = "App">สถานะ : เป็นลม</h3>)} 
               {trackPerson.event_code ==8 &&(<h3 className = "App">สถานะ : สลบ</h3>)} 
               {trackPerson.event_code ==0 && (<h3 className = "App">สถานะ : ปกติ</h3>)} 
               <hr/>
               </p>
       </Popup>
          )}

        </>
      )
  }
if(isLoadding&&pm25InfoOne.length!=0){
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxApiAccessToken="pk.eyJ1IjoiaGFtYTg5NyIsImEiOiJjazR6ZG5yY20wOWgzM21tcWVlbnFtOXB4In0.KjTfvistF0bqFqTk0OVsTA">
      {getPMLocation(pm25InfoOne)}
      {getPMLocations(pm25InfoTwo)}
      {getPMLocationss(pm25InfoThree)}
      {getPMLocationsss(pm25InfoFour)}
      {getHOME(home)}
      {getStatusPerson(personlist,trackPerson)}
    </ReactMapGL>
);
}
else {
  return(
<div className="main">
  <div className="parent">
        <Icon type="loading" style={{ fontSize: '150px', color: '#08c' }}/> 
      </div>
</div>)
}

}
export default App
