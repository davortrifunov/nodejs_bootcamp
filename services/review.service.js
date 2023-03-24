const prisma = require('../prisma/prisma-client')

const create = async (data) => {
    const hasComment = await prisma.reviews.findFirst({
        where: {
            planId: parseInt(data.planId)
        }
    })
    if (hasComment) {
        throw new Error('You have already left comment on this post', 400)
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

const readForSubscribers = async () => {
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