import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import { useState } from 'react';
// import { getCenter } from 'geolib/es/getCenter';
const geolib = require('geolib');


function Map({searchResults}){

    const coordinates = searchResults.map(result=>({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = geolib.getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:11
    })

    
    return <ReactMapGL
        mapStyle='mapbox://styles/adilh621/clcxsxqww000814qme8msvhta'
        // mapboxApiAccessToken={process.env.mapbox_key}
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        // onViewportChange={(nextViewport)=>{
        //     console.log(nextViewport)
        //     setViewport(nextViewport)
        // }}
        onMove={(nextViewport)=>{
            // console.log(nextViewport.viewState)
            setViewport(nextViewport.viewState)
            
        }}
    >
        {searchResults.map(result=>(
            <div key={result.long}>
                <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <p className='cursor-pointer text-xl animate-bounce'
                    >📌</p>
                </Marker>
            </div>
        ))}

    </ReactMapGL>
}

export default Map;