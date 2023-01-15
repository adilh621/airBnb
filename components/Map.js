import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import { useState } from 'react';
const geolib = require('geolib');
import "mapbox-gl/dist/mapbox-gl.css";


function Map({searchResults}){

    const coordinates = searchResults.map(result=>({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = geolib.getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width:'100%',
        height:'100%',
        latitude: (center.latitude - .15),
        longitude: center.longitude,
        zoom:11
    })
    const [selectedLocation, setSelectedLocation] = useState({})

    
    return <ReactMapGL
        mapStyle='mapbox://styles/adilh621/clcxsxqww000814qme8msvhta'
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        onMove={(nextViewport)=>{
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
                    <p 
                    onClick={()=>{setSelectedLocation(result)}}
                    className='cursor-pointer text-xl animate-bounce' 
                    aria-label='push-pin' 
                    role='img'>
                        📌
                    </p>
                </Marker>

                {selectedLocation.long === result.long ? (

                    <Popup onClose={()=>{setSelectedLocation({})}} closeOnClick={true} latitude={result.lat} longitude={result.long}>{result.title}</Popup>

                ) : (false)}
            </div>
        ))}

    </ReactMapGL>
}

export default Map;