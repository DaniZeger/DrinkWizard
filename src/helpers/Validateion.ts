export function defaultImageUrl(url: string) {
    const imageUrl = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=996'
    if (url != '') {
        return url
    }
    return imageUrl
}


export function formsRequireValidate(value: string,): boolean {
    if (!value) {
        return false
    }
    return true
}

export function formsPasswordValidate(password: string): boolean {
    if (password.length < 8 || password.length > 15) {
        return false
    }
    return true
}

export function formsLengthValidate(value: string): boolean {
    if (value.length < 2) {
        return false
    }
    return true
}

export function formsMailValidate(email: string): boolean {
    const emailRe = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/
    if (!emailRe.test(email)) {
        return false
    }

    return true
}



