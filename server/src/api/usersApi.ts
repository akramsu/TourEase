import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsers(username: string, password: string, email: string, phoneNumber: string, birthDate: Date, postcode: string, gender: string, profilePicture: string, role: Role) {
    
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password,
                email,
                phoneNumber,
                gender,
                postcode,
                profilePicture,
                birthDate,
                role:{
                    
                }
            }
        });
    } catch (error) {
        console.error("failed to create new user");
        throw error;
    }
}

export default createUsers;