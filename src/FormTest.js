import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function FormTest(props) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setUserData({
            fullName: "James Cameron",
            program: "CPA"
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('The Form Was Submitted: ' + JSON.stringify(userData));
    }

    const handleChangeName = (e) => {
        let target = e.target; // event initiator
        let value = target.value; // value on event
        let name = target.name; // name of the value

        console.log("inside handle change name");
        console.log(target.value);

        setUserData(userData => {
            return {...userData, [name]: value}; 
        });
    }

    const handleChangeProgram = (e) => {
        let target = e.target; // event initiator
        let pro = target.pro; // value on event
        let program = target.program; // name of the value

        console.log("inside handle change name");
        console.log(target.value);

        setUserData(userData => {
            return {...userData, [program]: pro}; 
        });
    }

    if (!userData) {
        return null; // wait till ready
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Student Name:
                <input type="text" name="fullName" value={userData.fullName} onChange={handleChangeName} />
                </label>
                <br/>
                <input type="radio" id="program" name="CPA" value="CPA" pro={userData.program} onChange={handleChangeProgram}/>
                <label form="CPA"> CPA</label>
                <br/>
                <input type="radio" id="program" name="CPD" value="CPD" pro={userData.program} onChange={handleChangeProgram}/>
                <label form="CPD"> CPD</label>
                <br/>
                <button type="submit">Update Student</button>
            </form>
        );
    }
}
