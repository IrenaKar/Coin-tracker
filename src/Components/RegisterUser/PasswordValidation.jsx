import { useState, useEffect } from "react";

export const usePasswordValidation = ({ password = "", requiredLength = 8, requiredLength2 =32 }) => {
    const [validLength, setValidLength] = useState(null);

    const [specialChar, setSpecialChar] = useState(null);
    const [validLength2, setValidLength2] = useState(null);


    useEffect(() => {
        setValidLength(password.length >= 8 ? true : false);
        setValidLength2(password.length <= 32 ? true : false);
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));

    }, [password, requiredLength, requiredLength2]);


    return [validLength, specialChar, validLength2];
}

