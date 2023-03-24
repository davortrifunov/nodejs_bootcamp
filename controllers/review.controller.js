const ReviewService = require('../services/review.service');

const coachReviews = async (req, res, next) => {
    try {
        const data = req.body;
        const results = await ReviewService.readForCoaches(data);
        return res.status(200).json({ message: "All reviews for your plans", results });
    } catch (error) {
        error.code = 401;
        console.log(error)
        next(error)
    }
}


const subscriberReviews = async (req, res, next) => {
    try {
        const results = await ReviewService.readForSubscribers();
        return res.status(200).json({ message: "All reviews for expired plans", results });
    } catch (error) {
        error.code = 401;
        console.log(error)
        next(error)
    }
}

const createReview = async (req, res, next) => {
    try {
        const data = req.body;
        const results = await ReviewService.create(data);
        return res.status(200).json({ message: "Review was created", results });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    coachReviews,
    subscriberReviews,
    createReview
}