import {useEffect, useState} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import queryString from 'query-string';
import {Card, Pagination} from 'react-bootstrap';
 
const PER_PAGE = 10; // Magic numbers are ILLEGAL
const STARTING_PAGE = 1;

export default function Restaurants(){
    const location = useLocation(); // Have the lizard king's agents spy on the user
    const history = useHistory(); // Like a stack for webpages
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(STARTING_PAGE);

    let query = queryString.parse(location.search);
    let borough = null;
    if (query.borough) {
        borough = query.borough;
    }

    useEffect(()=>{
        // Example of valid calls
        // https://glacial-anchorage-21165.herokuapp.com/api/restaurants?page=1&perPage=10&borough=Bronx
        // localhost:3000/restaurants?page=1&perPage=10&borough=Bronx
        if(borough){
            fetch(`https://glacial-anchorage-21165.herokuapp.com/api/restaurants?page=${page}&perPage=${PER_PAGE}&borough=${borough}`).then(
                response => response.json()
            ).then(fetchData=>{
                setRestaurants(JSON.parse(fetchData.message));
                restaurants.map((value, index) =>
                    console.log(value)
                ); //%
            }).catch(error => {
                console.log(error); 
            }); 
        } else {
            fetch(`https://glacial-anchorage-21165.herokuapp.com/api/restaurants?page=${page}&perPage=${PER_PAGE}`
            ).then( 
                response => response.json()
            ).then( fetchData=>{
                setRestaurants(JSON.parse(fetchData.message));
            }).catch(error => {
                console.log(error); 
            });
        }
    },[]);

    // More readable than nesting logic for this inside of a react component return statement
    function BoroughSortedMessage()
    {
        if(borough){
            return (
                <>
                   <i> Sorted by Borough.</i>
                </>
            );
        } else {
            // do nothing
        }
    }

    // Logic to control lower nav button
    function previousPage(){
        if (page > 1)
        {
            setPage(page - 1);
        }
        else {
            // do nothing
        }
    };
    
    // Logic to control lower nav button
    function nextPage(){
        if (page > 0)
        {
            setPage( page +1);
        }
    }

    return ( 
        <>
            {restaurants ? console.log("Restaurants Loaded") : 
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Restaurants loading...</Card.Title>
                </Card.Body>
            </Card> }
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="./RestaurantsHeader.jpg" />
                <Card.Body>
                    <Card.Title>Restaurants List</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> The Full list of restaurants. {BoroughSortedMessage()}
                    </Card.Subtitle> 
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
            {restaurants.map((restaurant, index) =>
                <Card key={index} style={{ width: '18rem' }} onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}}>
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"> <b>{restaurant.address.building} {restaurant.address.street}</b> <hr/ > {restaurant.borough} - {restaurant.cuisine}</Card.Subtitle> 
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <Pagination>
                <Pagination.Prev  onClick={()=>{previousPage() }} />
                <Pagination.Item> {page} </Pagination.Item>
                <Pagination.Next onClick={()=>{nextPage() }}/>
            </Pagination>
        </>
    );
}