import { useRest } from "./rest"

export const useSavers = () => {

    const saver = rest => (item) =>
        rest.save(item)
            .then(({ saved }) => saved)

    return {
        cities: saver(useRest('/manage/city')),
        adm: saver(useRest('/manage/adm')),
        countries: saver(useRest('/manage/country')),
    }
}