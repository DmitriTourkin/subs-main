import '../components/adaptive-select.css'; 
import { useState, useRef, useMemo, useEffect} from 'react';
import axios from 'axios';

export default function AdaptiveSelect(props) {
  // const [categories, setCategoriesData] = useState([props.categoriesData]); //категории с сервера через API, чтобы использовать id, value; 

  const [showed, setShowed] = useState(false);
  const [choosenOptions, setChoosenOptions] = [props.choosenOptions, props.setChoosenOptions];

  const selectHeaderRef = useRef(null);
  const selectBodyRef = useRef(null);
  const categoryText = useRef(null);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
      console.log('Категории', categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleSelectBody = () => {
    setShowed(!showed); // Изменяем состояние видимости
    if (selectBodyRef.current) {
      selectBodyRef.current.classList.toggle('show'); // Добавляем/удаляем класс 'show'
    }
  };

  const handleCheckboxChange = useMemo(() => (value) => {
    const updatedOptions = choosenOptions.includes(value) 
      ? choosenOptions.filter(option => option !== value) 
      : [...choosenOptions, value];
    setChoosenOptions(updatedOptions);
    console.log('chooseOptions: ', updatedOptions);
  }, [choosenOptions]);


  return (
    <div className="custom-select-wrapping">
      <div className="custom-select">
        <div className="select-header"  id="resizable" ref={selectHeaderRef} onClick={toggleSelectBody}>
          {choosenOptions.length === 0 ? <p ref={categoryText}> Категории в виде квадратиков будут здесь</p>: ""}
          {choosenOptions.map(option => {
            return (<div className='chosen-category'>{option}</div>)
          })}
        </div>
        <div className={`select-body ${showed ? 'show' : ''}`} ref={selectBodyRef}>
        {categories.map(category => {
          <div key={category.id} className="select-item" onClick={() => handleCheckboxChange({category})}>
            <div className="select-item-body">
              <input type="checkbox" className="hidden-checkbox" checked={choosenOptions.includes(categories)}/>
              <span className="pseudo-checkbox"></span>
              <p className="select-value">{category.name}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>
  );
}