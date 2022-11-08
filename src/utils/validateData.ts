const dataRegEx = new Map([
    ["name", /^[A-Za-z]{3,20}\s[A-Za-z]{3,20}$/],
    ["email", /^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/],
    ["password", /^[^('"()\\.)]{8,}$/],
])



const validateData = (name:string, value:string) => {
    const isValid = dataRegEx.get(name)?.test(value)
    return isValid
}


export default validateData