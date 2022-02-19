import { useRest } from "./rest"

export const useRemovers = () => {

    const remover = rest => (item) => rest.del({ geoNameIds: [item.geoNameId] })

    return {
        cities: remover(useRest('/manage/city')),
        adm: remover(useRest('/manage/adm')),
        countries: remover(useRest('/manage/country')),
    }
}