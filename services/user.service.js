const prisma = require('../prisma/prisma-client')

const create = async (data) => {
    const results = await prisma.user.create({
        data: {
            name: data.name,
            lastName: data.lastName,
            dob: new Date(data.dob),
            email: data.email,
            password: data.password,
            height: parseInt(data.height),
            weight: parseInt(data.weight),
            role: data.role,
        }
    })
    return results
}

const findUser = async (data) => {
    return await prisma.user.findFirstOrThrow({
        where: {
            OR: [
                {
                    email: data.email,
                },
                {
                    password: data.password
                }
            ]
        }
    })

}

const findUserById = async (data) => {
    return await prisma.user.findFirstOrThrow({
        where: {
            id: data.id
        }
    })
}



module.exports = {
    create,
    findUser,
    findUserById
}