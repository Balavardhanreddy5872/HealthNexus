import bcrypt from 'bcrypt'

export const hashPassword  = async(password) =>{
 
    try{
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password,saltRounds);
        return hashedpassword 
    }
    catch(error){
        console.log(error);
    }
};

export const comaparePassword = async(password,hashPassword) =>{
    return bcrypt.compare(password,hashPassword);
}

