const BASE_URL = 'https://backend-subs-control.onrender.com/api/alimno?uuid='

export async function getUserDetailByUUID(uuid:string){

    const response = await fetch(BASE_URL+uuid)
    const data = await response.json()

    return data
}