import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import styled from "styled-components"
import './style.css'

const CardPages = () => {
  const [recipes, setRecipes] = useState([])
  const [loadingState, setLoadingState] = useState(true)
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("instructions")

  const getDataFrom = () => {
    console.log('getDataFrom')
		setLoadingState(true);

		async function getRecipes() {
			const apiResponse = await fetch(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=82c153f7a5b449f18356bcdd52d3e62b`
			);
			const result = await apiResponse.json();

			if (result) {
				setLoadingState(false);
				setRecipes(result);
			}
		}

		getRecipes();
	};

  useEffect(() => {
    getDataFrom()
  }, [id])

  if (loadingState) {
    return (
      <>
        <Navbar />
        <div className="Recipes_Style">
          <h1>Loading...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <DetailWrapper>
            <div>
                <h1>{recipes.title}</h1>
                <img src={recipes.image} alt="" />
            </div>
      <Info>
                <Button className={activeTab === "instructions" ? "active" : ''} onClick={() => setActiveTab("instructions")}>
                    Instructions
                </Button>

                <Button className={activeTab === "ingredients" ? "active" : ''} onClick={() => setActiveTab("ingredients")}>
                    Ingredients
                </Button>

                {activeTab === 'instructions' && (
                    <div>
                        <h2 dangerouslySetInnerHTML={{ __html: recipes.summary }}>
                        </h2>
                        <h2 dangerouslySetInnerHTML={{ __html: recipes.instructions }}>
                        </h2>

                    </div>
                )}

                {activeTab === 'ingredients' && (
                    <ul>
                        {recipes.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}


            </Info>
      </DetailWrapper>
    </>
  )
}


const Button = styled.button`
border-radius: 7%;
cursor: pointer;
padding: 0.3rem 1rem;
font-size: 1.6rem;
color: #313131;
background: rgba(255,223,183,0.9);
margin-right: 2rem;
font-weight: 500;
.heart-icon{
    color: red;
    font-size: 1.2rem;
    padding: 0.1rem 0.1rem;
    font-weight: 900;

    }
`;

const DetailWrapper = styled.div` 
    margin: 2rem 2rem; 
    display: flex;
    color: #e64f29;
    .active{
        background: #ffab40;
        color:  #292421;
    }
    h1{
        margin-bottom: 3rem;
    }
    h2 {
      margin-top: 2rem;
      color:  #292421; 
      font-size: 1.4rem;
      line-height: 1.8rem;
      font-weight: 100;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
        color:  #292421; 
        font-weight: 400;
    }
    ul {
        font-size: 1.2rem;
        line-height: 2.5rem;
        margin-top: 2rem;
        color:  #292421; 
    }
`;

const Info = styled.div`
margin-left: 10rem;`;

export default CardPages
