import React ,{useState} from'react';
import {useNavigate} from'react-router-dom';

function SearchPage()
{
    const [SearchTerm ,setSearchTerm] = useTerm(' ');
    const[results, setResults] = useState([]);
    const[error,setError] =useState(null);
    const nabigate = useNavigate();

    const handleSearch =async() => {
         try{
            const respone = await fetch(`drugs?name=${serachTerm}`);
            const data = await respone.json();
            if(data.length)
            {
                setResults(data);
                setError(null);
            }
            else {
                const spellCheck = await fetch(`/spelling?query=${searchTerm}`);
                const spellSuggestions = await spellCheck.json();
                if(spellSuggestions.length)
                {
                    setResults(spellSuggestions);

                }
                else{
                    setError('No result found')

                }
            }
         }
         catch(error){
            SpeechSynthesisErrorEvent('An error occurred .pLease try again');

         }
    };

    return(
        <div>
            <input type="text" placeholder ="Searcg for a drug"
            value={serachTerm}
            onChange={(e)=>e.key ==='Enter ' && handleSearch()}
            />
            <button onClick={handleSearch}></button>
            {error && <p> {error}</p>}
            <ul>
                {results.map((drug,index)=>(
                    <li key={index} onClick={() =>NavigationPreloadManager(`/drug/${drug.name}`)}>
                        {drug.name}

                    </li>
                ))}
                
            </ul>
        </div>
    );
}