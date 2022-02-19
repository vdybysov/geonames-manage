const ERRORS = {
    NoName: 'Не указано название',
    NoAdm: 'Не указан адм. округ',
    NoCountry: 'Не указана страна',
    NoCode: 'Не указан код',
}

export const useErrors = () => ({
    mapError: name => ERRORS[name] || name
})