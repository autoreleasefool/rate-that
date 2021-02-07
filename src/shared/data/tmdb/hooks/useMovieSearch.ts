import {useEffect, useState} from 'react';
import {buildRequestUrl} from '../api';
import {useConfiguration} from './useConfiguration';
import {Movie} from '../schema';

interface MovieSearchParams {
  query: string;
}

interface MovieSearchResult {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
  overview: string;
}

export interface UseMovieResult {
  results?: Movie[];
  error?: Error;
}

export const useMovieSearch = ({query}: MovieSearchParams): UseMovieResult => {
  const url = buildRequestUrl({path: 'search/movie', query: {query}});
  const configuration = useConfiguration();
  const [results, setResults] = useState<Movie[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const performQuery = async () => {
      if (!configuration || !query) {
        setResults([]);
        return;
      }

      console.log(`Performing query, ${url}`);
      const fetchResults: MovieSearchResult[] = [
        {
          id: 167,
          overview:
            'Prot is a patient at a mental hospital who claims to be from a far away planet. His psychiatrist tries to help him, only to begin to doubt his own explanations.',
          poster_path: '/c8M0ylYFRpQJaxGwPwm3DKK2ltC.jpg',
          release_date: '2001-10-22',
          title: 'K-PAX',
        },
        {
          id: 10345,
          overview:
            'The extravagant cop Michael Dooley needs some help to fight a drug dealer who has tried to kill him. A "friend" gives him a dog named Jerry Lee (Officer Lewis), who has been trained to smell drugs. With his help, Dooley sets out to put his enemy behind the bars, but Jerry Lee has a personality of his own and works only when he wants to. On the other hand, the dog is quite good at destroying Dooley\'s car, house and sex-life...',
          poster_path: '/21mBNUe0X4WYywe6w5DyihltmAn.jpg',
          release_date: '1989-04-28',
          title: 'K-9',
        },
        {
          id: 271708,
          overview:
            'The "Academy Island Incident" in which four "kings" cross paths... Since then, Silver Clansmen Kuroh Yatogami and Neko have been searching for their master, Shiro. Without finding any clues to Shiro\'s whereabouts, the two became disheartened. However, one day, they see HOMRA members Rikio Kamamoto and Anna Kushina being chased by someone.',
          poster_path: '/qEeNmNcjZvUOOpzr4pNR7TA8x7u.jpg',
          release_date: '2014-07-12',
          title: 'K: Missing Kings',
        },
        {
          id: 41586,
          overview:
            'Dooley and his dog Jerry Lee still are active as a police team with the LAPD. However, years starting and counting Captain Roger Byers thinks they urgently need to do something with their condition. He even forces them to work with a second team: the one of the young Sergeant Welles and her disciplined Dobermann Zeus. Dooley and Jerry Lee thinks they can work without their new partners but a mysterious sharp-shooter forces them to the ultimate cooperation',
          poster_path: '/1ZsF9u6bBp46mMXTOpSAqowlZW4.jpg',
          release_date: '1999-12-07',
          title: 'K-911',
        },
        {
          id: 616584,
          overview:
            'Cry Baby, a strong and sensitive girl, is sent off to a disturbing sleepaway school that’s hidden underneath a grandiose façade. Luckily, she has a sweet and unapologetic best friend who sticks up for her when she gets bullied by the other students whose brains are under control by the Principal and his wicked staff. With the help of the magical friends they meet along the way, as well as an Angelic Spirit Guide, they are able to gain the strength they need to fight off the school’s belligerent patriarchal conditioning.',
          poster_path: '/nVi0yBBPj5Z96JgGWVIg94kv7bR.jpg',
          release_date: '2019-09-05',
          title: 'K-12',
        },
        {
          id: 47354,
          overview:
            'Dooley and his K-9 partner Jerry Lee are ready to retire from the police force. But before he can retire with his pension he must work as a P.I. to find a set of high tech computer chips.',
          poster_path: '/lkI06uQJCnujYoN6MJzjnsxryaI.jpg',
          release_date: '2002-07-30',
          title: 'K-9: P.I.',
        },
      ];
      const res = fetchResults.map(result => ({
        id: result.id,
        title: result.title,
        overview: result.overview,
        releaseDate: result.release_date,
        basePosterPath: result.poster_path
          ? `${configuration.images.secure_base_url}{WIDTH}${result.poster_path}`
          : undefined,
      }));
      setResults(res);
      // try {
      //   const result = await fetch(url);
      //   const json = await result.json();
      //   setResults(json.results);
      // } catch (err) {
      //   setError(err);
      // }
    };

    // setDidPerformQuery(true);
    performQuery();
  }, [url, setError, setResults, configuration, query]);

  return {
    results,
    error,
  };
};
