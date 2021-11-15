import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Card } from 'react-bootstrap';
 
export default function Restaurant(){
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() =>{
        setLoading(true);
        // example valid url
        // http://localhost:3000/restaurant/5eb3d668b31de5d588f4292e
        fetch(`https://glacial-anchorage-21165.herokuapp.com/api/restaurants/${id}` // messed up this route as per the assignment brief, "restaurants/:_id" instead of  "restaurant/:_id"
        ).then(  response => response.json()
        ).then(fetchData=>{
            if(JSON.parse(fetchData.message).hasOwnProperty("_id")){
                setRestaurant(JSON.parse(fetchData.message));
            } else {
                console.log("Data not as expected.");
                setRestaurant(null);
            }
            setLoading(false);
        }).then(
        )
    }, []);

    // Alternate display while waiting for data
    if(loading || !restaurant){
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Restaurant loading...</Card.Title>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        return (   
            <>
                <Card style={{ width: '32rem' }}>
                    <Card.Img variant="top" src="..\RestaurantHeader.jpg" />
                    <Card.Body>
                        <Card.Title>{restaurant.name}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{restaurant.address.building} {restaurant.address.street}</Card.Subtitle> 
                        <Card.Text>If you like {restaurant.cuisine} food, then you'll <i>love</i> {restaurant.name} ;)</Card.Text>
                    </Card.Body>
                    <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}> <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
                        <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker> 
                    </MapContainer>
                    <Card.Text> <b>Grade : Date</b> <br/>
                    {restaurant.grades.map((element, index) =>{
                        return ( <>
                            <span key={index}>{element.grade} : {element.date.substring(0, 10)}  </span>
                            <br/>
                        </>
                    )})}
                    </Card.Text>
                </Card>
            </>
        );
    }
}