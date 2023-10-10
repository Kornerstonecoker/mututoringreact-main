import {
    useState,
    useEffect
} from "react";

import styles from './styles.module.css';

import {
    useDebounce
} from "../../hooks/Hooks";

import { Error } from '../../components/Error'

export const Search = ({ onSearch, resultMapper, title, placeholder = "Search", onEdit = () => {} }) => {
    const [toggled, setToggled] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const debounced = useDebounce(search, 200);

    const handleChange = (e) => {
        if(toggled) setToggled(false);
        e.preventDefault();
        setSearch(e.target.value);
    }

    useEffect(() => {
        if (!toggled && debounced && debounced.length > 0) {
            onSearch(debounced).then((response) => {
                setSearchResults(response.data);
            }).catch((error) => {
                setError(<Error error={error}/>);
            })
            onEdit();
        }
        else {
            setSearchResults([]);
        }
    }, [debounced])
    console.log(searchResults);
    return (
        <>
        <p className={styles.title}>{title}</p>
            <div className={styles.search} onClick={(e) => {
                setToggled(true);
                e.stopPropagation()
                setSearch(e.code)
                setSearchResults([]);
            }}>
                <div className={styles.searchContainer}>
                    <input className={toggled && styles.toggled || {}}
                        type="text" 
                        placeholder={placeholder} 
                        value={search} 
                        onChange={handleChange}
                    />
                </div>
                {<div className={styles.searchResults}>
                    {searchResults.map(result => 
                            resultMapper(result)
                    )}
                </div>}
            </div>
        </>
    )
}