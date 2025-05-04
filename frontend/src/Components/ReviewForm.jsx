import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";

const ReviewForm = ({ restaurantId }) => {
  const [onReviewSubmitted,setOnreviewSubmitted]=useState(false)
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewType, setReviewType] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment || !rating || !reviewType) {
      setError("Please provide a rating, comment, and a review type!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axiosInstance.post("/customer/review", {
        targetId: restaurantId, // Use restaurantId from props
        targetType: "restaurant",
        reviewType,
        rating,
        comment,
      });

      const data = response.data;

      if (!response.status === 200) {
        throw new Error(data.message || "Failed to submit review");
      }

      setSubmittedReviews([data.data, ...submittedReviews]);

      // Reset form
      setRating(0);
      setComment("");
      setReviewType("");

      // Notify parent component if callback exists
      if (onReviewSubmitted) {
        onReviewSubmitted(data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Review our Restaurant
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Rate the Restaurant
          </h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
                disabled={isSubmitting}
              >
                <FaStar
                  size={30}
                  color={star <= (hover || rating) ? "#FFD700" : "#E4E5E9"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="reviewType"
            className="block text-lg font-medium text-gray-700"
          >
            Review Type
          </label>
          <select
            value={reviewType}
            onChange={(e) => setReviewType(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={isSubmitting}
          >
            <option value="">Select a review type</option>
            <option value="Food Quality">Food Quality</option>
            <option value="Service">Service</option>
            <option value="Ambiance">Ambiance</option>
            <option value="Value for Money">Value for Money</option>
            <option value="Cleanliness">Cleanliness</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-lg font-medium text-gray-700"
          >
            Your Review
          </label>
          <textarea
            id="comment"
            className="w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            rows="4"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
