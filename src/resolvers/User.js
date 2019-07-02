import getUserId from '../utils/getUserId'
const User = {
    email: {
        fragment: 'fragment userId on User{ id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false)
            if (parent.id == userId) {
                return parent.email
            }
            return null
        }
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { prisma, request }, info) {
            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            }, info)
        }
    }
}

export {
    User as default
}