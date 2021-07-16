import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function News({ newsid, fjoldi  }) {
  // TODO sækja fréttir fyrir flokk
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      const url = `${apiUrl}${newsid}`
      try {
        const result = await fetch(url);
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
  }, [newsid]); 

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


  return(
    <div className={!fjoldi ? s.news : null}>
      <div className={!fjoldi ? s.newsitems : null}>
        {data && (<h2>{data.title}</h2>)}
        {data && data.items.slice(0, fjoldi).map((frett,index) => (
          <p key={index}><a href={frett.link}>{frett.title}</a></p>
        ))}
      </div>
      {!fjoldi &&
        <NavLink 
          className={s.navlink}
          to='/'>Til baka
        </NavLink>
      }
    </div>
  );
}
