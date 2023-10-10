import { Search } from '../Search';
import { searchCourses, searchModules, searchModulesByCourse } from '../../endpoints';
import { ResultCard } from '../ResultCard';

import styles from './styles.module.css';

import { FaAngleDoubleDown } from 'react-icons/fa';

import {
  useState,
} from 'react';
import { TutorContainer } from '../TutorContainer';

export const SearchUI = ({ depth = 2, onResult = () => {} }) => {
  const [course, setCourse] = useState("");
  const [module, setModule] = useState("");

  const renderTutors = () => depth >= 2 && course.length > 0 && module.length > 0
    && <div>
      <div className={styles.arrow}>
        <FaAngleDoubleDown/> 
      </div>
      <TutorContainer code={module} />
    </div>


  const renderModules = () => depth >= 1 && course.length > 0
    && <div>
      <div className={styles.arrow}>
        <FaAngleDoubleDown/> 
      </div>
      <Search
        title={"Module"}
        placeholder={"Search modules"}
        onSearch={query => searchModulesByCourse(course, query)}
        onEdit={() => setModule("")}
        resultMapper={({ name, code }) => <ResultCard
          name={name}
          code={code}
          onClick={e => {
            setModule(code);
            depth == 1 && onResult(code);
            e.code = code;
            return e
          }}
        />
        } />
    </div>

  return (
    <>
      <Search
        title={"Course"}
        placeholder={"Search courses"}
        onSearch={searchCourses}
        onEdit={() => { setCourse(""); setModule("") }}
        resultMapper={({ name, code }) => <ResultCard
          name={name}
          code={code}
          onClick={e => {
            setCourse(code);
            depth == 0 && onResult(code);
            e.code = code;
            return e
          }}
        />}
      />
      {renderModules()}
      {renderTutors()}
      </>
  )
}