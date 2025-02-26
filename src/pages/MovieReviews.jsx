import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./MovieReviews.module.css";

const API_KEY = "28ee6e3a9fd21d8e654c008a509ae874";

function MovieReviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
                );
                setReviews(response.data.results);
            } catch (err) {
                setError("Failed to fetch reviews");
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Loading reviews...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className={styles.noReviews}>
                No reviews available for this movie
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.reviewsWrapper}>
                <h2 className={styles.title}>Movie Reviews</h2>
                <ul className={styles.reviewsList}>
                    {reviews.map((review) => (
                        <li key={review.id} className={styles.reviewItem}>
                            <h3 className={styles.author}>{review.author}</h3>
                            <p className={styles.content}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MovieReviews;
