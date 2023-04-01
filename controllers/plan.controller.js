const PlanService = require('../services/plan.service')

const createPlan = async (req, res, next) => {
    try {
        if (req.user.role == 'Subscriber') {
            return res.status(400).json({ message: "Subscribers cannot create a plan" })
        }
        const data = req.body
        const results = await PlanService.create(data, req.user)
        return res.status(200).json({ message: "Plan was created", results })
    } catch (error) {
        error.code = 401
        next(error)
    }
}

const editPlan = async (req, res, next) => {
    try {
        if (req.user.role == 'Subscriber') {
            return res.status(400).json({ message: "Subscribers cannot edit a plan" })
        }
        const data = req.body
        const results = await PlanService.edit(data)
        return res.status(200).json({ message: "Plan was edited", results })
    } catch (error) {
        error.code = 401
        next(error)
    }
}

const deletePlan = async (req, res, next) => {
    try {
        if (req.user.role == 'Subscriber') {
            return res.status(400).json({ message: "Subscribers cannot delete a plan" })
        }
        const data = req.body
        const results = await PlanService.deletePlan(data)
        return res.status(200).json({ message: "Plan was deleted", results })
    } catch (error) {
        next(error)
    }
}

const listSubscribers = async (req, res, next) => {
    try {
        if (req.user.role == 'Subscriber') {
            return res.status(400).json({ message: "Subscribers cannot see subs to a plan" })
        }
        const data = req.body
        const results = await PlanService.listSubscribers(data)
        return res.status(200).json({ message: "Subscribers: ", results })
    } catch (error) {
        error.code = 401
        next(error)
    }
}

const listPlans = async (req, res, next) => {
    try {
        const data = req.body
        const results = await PlanService.listPlans(data)
        return res.status(200).json({ message: "Plans: ", results })
    } catch (error) {
        error.code = 401
        next(error)
    }
}

const listPlansByCoach = async (req, res, next) => {
    try {
        const data = req.body
        const results = await PlanService.listPlansByCoach(data)
        return res.status(200).json({ message: "Plans: ", results })
    } catch (error) {
        error.code = 401
        next(error)
    }
}

const subscribe = async (req, res, next) => {
    try {
        const data = req.body
        const results = await PlanService.subscribe(data, req.user)
        return res.status(200).json({ message: "Successfully subscribed ", results })
    } catch (error) {
        next(error)
    }
}

const listSubscriptions = async (req, res, next) => {
    try {
        const results = await PlanService.listSubscriptions(req.user)
        return res.status(200).json({ message: "Plans: ", results })
    } catch (error) {
        error.code = 401
        console.log(error)
        next(error)
    }
}

module.exports = {
    createPlan,
    editPlan,
    deletePlan,
    listSubscribers,
    listPlans,
    listPlansByCoach,
    subscribe,
    listSubscriptions
}