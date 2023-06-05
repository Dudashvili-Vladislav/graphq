import Owner from "entities/Owner"
import { useRepository } from "entities/Repositories"
import { useNavigate, useParams } from "react-router-dom"
import { classNames } from "shared/lib/classNames/classNames"
import { PageLoader } from "shared/ui/PageLoader/PageLoader"

import cls from "./RepositoryDetail.module.scss"

export const RepositoryDetail = () => {
    const params = useParams()
    const navigate = useNavigate()
    if (!params.id) {
        return <div>Не выбран репозиторий</div>
    }
    const { data, loading, error } = useRepository(params.id)

    if (loading) {
        return <PageLoader />
    }

    if (!data) {
        return <div>notFound</div>
    }

    const date = new Date(data.pushedAt)

    return (
        <div className={classNames(cls.repository)}>
            <button className={classNames(cls.back)} onClick={() => navigate(-1)}>Назад</button>
            <div className={classNames(cls.repository__info)}>
                <div className={classNames(cls["repository__info-header"])}>
                    <a href={data.url} target="_blank">{data.name}</a><span>Звезды {data.totalCount}</span><span>Последний коммит: {date.getDay()}.{date.getMonth()}.{date.getFullYear()}</span>
                </div>
                <ul className={classNames(cls.repository__languages)}><div className={classNames(cls["repository__languages-title"])}>Языки</div>{data.languages.map(lang => <li key={lang}>{lang}</li>)}</ul>
                <p className={classNames(cls.repository__description)}>{data.description || 'Описание отсутствует'}</p>
            </div>
            <Owner {...data.owner} />
        </div>
    )
}