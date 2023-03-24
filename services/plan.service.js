const prisma = require('../prisma/prisma-client')

const create = async (data) => {
    const results = await prisma.plan.create({
        data: {
            title: data.title,
            description: data.description,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            userId: parseInt(data.userId)
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
            startDate: data.startDate,
            endDate: data.endDate,
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

const subscribe = async (data) => {
    const user = await prisma.user.findFirst({
        select: {
            role: true
        },
        where: {
            id: parseInt(data.planId)
        }
    })
    if (user.role === 'coach') {
        throw new Error("Coaches cannot subscribe to a plan", 400)
    }
    const results = await prisma.plansWithUsers.create({
        data: {
            userId: data.userId,
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