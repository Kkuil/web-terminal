export const LOCAL_PREFIX = "ssh_"

export const LOCAL_HOST_KEY = "host"
export const LOCAL_PORT_KEY = "port"
export const LOCAL_USERNAME_KEY = "username"
export const LOCAL_PASSWORD_KEY = "password"

export const getValue = (key: string) => {
    return localStorage.getItem(LOCAL_PREFIX + key)
}
