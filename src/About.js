import {Button, Card} from 'react-bootstrap';

function About(){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="./profile.png" />
            <Card.Body>
                <Card.Title>Liam Gallagher</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Musician, Tech Entrepreneur, Web Developer</Card.Subtitle>
                <Card.Text>
                    In September I accidentally made the internet give me $16,000 to make Game Boy software!
                    <a href="https://www.kickstarter.com/projects/gbproductivity/gb-productivity-suite"> The GB Productivity Suite <img src="./AllIn1CartSmall.png"/>
                    </a>
                </Card.Text>
                <a href="https://www.kickstarter.com/projects/gbproductivity/gb-productivity-suite">
                    <Button variant="primary">Give Liam Money</Button>
                </a>
            </Card.Body>
        </Card>
    );
}

export default About;