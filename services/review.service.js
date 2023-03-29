const moment = require('moment')
const prisma = require('../prisma/prisma-client')

const create = async (data, user) => {
    if (user.role == 'Coach') {
        throw new Error('Coaches cannot leave comments', 400)

    }
    const hasComment = await prisma.reviews.findFirst({
        where: {
            planId: parseInt(data.planId)
        }
    })
    if (hasComment) {
        throw new Error('You have already left comment on this post', 400)
    }
    const plan = await prisma.plan.findFirst({
        where: {
            id: parseInt(data.planId)
        }
    })
    if (moment().isBefore(moment(plan.endDate))) {
        throw new Error('You cannot leave a comment before it is expired', 400)
    }
    const results = await prisma.reviews.create({
        data: {
            comment: data.comment,
            rating: parseInt(data.rating),
            planId: parseInt(data.planId)
        }
    })

    return results
}

const readForSubscribers = async (user) => {
    if (user.role == 'Coach') {
        throw new Error('Coaches cannot list all plans', 400)
    }
    const expiredPlansIds = await prisma.plan.findMany({
        select: {
            id: true
        },
        where: {
            endDate: {
                lte: new Date()
            }
        }
    });
    const ids = expiredPlansIds.map((plan) => plan.id);
    const results = await prisma.reviews.findMany({
        where: {
            planId: { in: ids }
        }
    });
    return results
}

const readForCoaches = async (data) => {
    const coachPlans = await prisma.plan.findMany({
        select: {
            id: true
        },
        where: {
            userId: parseInt(data.id)
        }
    });
    const ids = coachPlans.map((plan) => plan.id);
    const results = await prisma.reviews.findMany({
        where: {
            planId: { in: ids }
        }
    });
    return results
}

module.exports = {
    create,
    readForSubscribers,
    readForCoaches
}