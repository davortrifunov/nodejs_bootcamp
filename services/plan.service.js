const moment = require('moment')
const prisma = require('../prisma/prisma-client')

const create = async (data, coach) => {
    const results = await prisma.plan.create({
        data: {
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            userId: parseInt(coach.id)
        }
    })

    return results
}

const edit = async (data) => {
    const results = await prisma.plan.update({
        where: {
            id: parseInt(data.id),
        },
        data: {
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        }
    })
    return results
}

const deletePlan = async (data) => {
    const checkPlan = await prisma.plansWithUsers.findFirst({
        where: {
            planId: parseInt(data.id)
        }
    })
    if (checkPlan) {
        throw new Error('Plan cannot be deleted', 400)
    }
    const results = await prisma.plan.delete({
        where: {
            id: parseInt(data.id),
        },
    })
    return results
}

const listSubscribers = async (data) => {
    const results = await prisma.plansWithUsers.findMany({
        select: {
            user: true
        },
        where: {
            planId: parseInt(data.id)
        }
    })
    return results
}

const listPlans = async (data) => {
    const results = await prisma.plan.findMany({
        where: {
            startDate: {
                lte: new Date()
            },
            endDate: {
                gte: new Date()
            }
        }
    })
    return results
}

const listPlansByCoach = async (data) => {
    const results = await prisma.plan.findMany({
        where: {
            userId: parseInt(data.id),
            startDate: {
                lte: new Date()
            },
            endDate: {
                gte: new Date()
            }
        }
    })
    return results
}

const subscribe = async (data, user) => {

    if (user.role === 'coach') {
        throw new Error("Coaches cannot subscribe to a plan", 400)
    }
    const plan = await prisma.plan.findFirst({
        where: {
            id: parseInt(data.planId)
        }
    })

    if (plan) {
        if (!moment().isBetween(moment(plan.startDate), moment(plan.endDate))) {
            throw new Error("Cannot subscribe to an inactive plan", 400)
        }

    } else {
        throw new Error("The plan doesn't exist", 400)
    }

    const exist = await prisma.plansWithUsers.findFirst({
        where: {
            userId: parseInt(user.id),
            planId: parseInt(data.planId)
        }
    })

    if (exist) {
        throw new Error("Already subscribed", 400)
    }

    const results = await prisma.plansWithUsers.create({
        data: {
            userId: parseInt(user.id),
            planId: parseInt(data.planId)
        }
    })
    return results
}

const listSubscriptions = async (data) => {
    const plans = await prisma.plansWithUsers.findMany({
        select: {
            planId: true
        },
        where: {
            userId: parseInt(data.id)
        }
    });
    const ids = plans.map(e => e.planId)
    const results = await prisma.plan.findMany({
        where: {
            id: { in: ids }
        }
    })
    return results
}



module.exports = {
    create,
    edit,
    deletePlan,
    listSubscribers,
    listPlans,
    listPlansByCoach,
    subscribe,
    listSubscriptions
}