import React , {useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../features/categorySlice'
import './categoriesbar.css'

const keyWords = [
  {
    name: "All",
    id: 0
  },
  {
    name: "Autos & Vehicles",
    id: 2
  },
  {
    name: "Music",
    id: 10
  },
  {
    name: "News & Politics",
    id: 25
  },
  {
    name: "Howto & Style",
    id: 26
  },
  {
    name: "Science & Technology",
    id: 28
  },
  {
    name: "Entertainment",
    id: 24
  },
  
  {
    name: "Sports",
    id: 17
  },
  
  {
    name: "Film & Animation",
    id: 1
  },
  
  {
    name: "Pets & Animals",
    id: 15
  },
  {
    name: "Gaming",
    id: 20
  }  
]




const CategoriesBar = () => {
  const dispatch = useDispatch()
  const { category } = useSelector(state => state.category)
  const handleClick = (value) => {    
    dispatch(setCategory(value.id))
  }
  return (
    <div className='categories__bar'>
      {
        keyWords.map((keyword , index)=> {
          return(
            <span key={index} 
            className={category === keyword.id ? 'active' : ''}
            onClick={() => handleClick(keyword)
            }> <small>{keyword.name}</small> </span>
          )
        })
      }
    </div>
  )
}

export default CategoriesBar