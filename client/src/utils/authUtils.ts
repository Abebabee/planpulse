import { jwtDecode } from "jwt-decode";

// Function to decode the JWT token and extract the email address
export const getEmailFromToken = (token: string | null): string | null => {
  try {
    if (!token) return null;

    // Decode the JWT token
    const decodedToken: { email: string } = jwtDecode(token);

    // Extract the email address from the decoded token
    const email: string = decodedToken.email;

    return email;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

export const getUserIdFromToken = (token: string | null): string | null => {
    try{
        if (!token) return null;

        // Decode the JWT token
        const decodedToken: { userId: string } = jwtDecode(token);
        const decodedUserId: string = decodedToken.userId
        return decodedUserId
    }catch(error){
        console.error("error decoding JWT token: ",error)
        return null
    }
}
