import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { News } from '../news/News';
import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  // TODO sækja yfirlit fréttaflokka
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      try {
        const result = await fetch(apiUrl);
        if (!result.ok) {
          throw new Error('result not ok');
        }
        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt fréttir');
        return;
      } finally {
        setLoading(false);
      }
      setData(json);
    }
    fetchData();
  }, []);   

  const headlines = [];
  for (let i = 0; i < data.length; i+=1){
    const frett = {id: data[i].id, title: data[i].title, url: data[i].url};
    headlines.push(frett);
  }

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }
  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  return (
    <div>
        <div className={s.frettir}>
          {data && headlines.map((frett, index) => (
            <div key={index} className={s.flokkar}>
              <div className={s.barafrettir}>
                <News newsid={frett.id} fjoldi={5}/>
              </div>
              <p><NavLink
                className={s.navlink}
                to={`/frett/${frett.id}`}>Allar fréttir
              </NavLink></p>
            </div>
          ))}
        </div>
    </div>
  );
}
