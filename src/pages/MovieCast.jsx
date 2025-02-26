import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import styles from "./MovieCast.module.css";

const API_KEY = "28ee6e3a9fd21d8e654c008a509ae874";
const MOVIE_URL = "https://api.themoviedb.org/3/movie/";

function MovieCast() {
    const { id } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(
                    `${MOVIE_URL}${id}/credits?api_key=${API_KEY}`
                );
                setCast(response.data.cast);
            } catch (err) {
                setError("Failed to fetch cast details");
                console.error("Error fetching cast:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading cast...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.castContainer}>
            {cast.length > 0 ? (
                <ul className={styles.castList}>
                    {cast.map((actor) => (
                        <li
                            key={actor.cast_id || actor.credit_id}
                            className={styles.castItem}
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : "https://placehold.co/200x300?text=No+Image"
                                }
                                alt={actor.name}
                                className={styles.castImage}
                            />
                            <div className={styles.castInfo}>
                                <p>{actor.name}</p>
                                <p>as {actor.character}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cast information available.</p>
            )}
        </div>
    );
}

export default MovieCast;
