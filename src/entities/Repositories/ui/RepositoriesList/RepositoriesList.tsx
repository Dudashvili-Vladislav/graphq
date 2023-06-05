import { Repository } from "../../model/types/repositories";
import { FC } from "react";
import { RepositoryCard } from "../RepositoryCard/RepositoryCard";
import cls from "./RepositoriesList.module.scss"
import { classNames } from "shared/lib/classNames/classNames";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import Pagination from "widgets/Pagination";

type Props = {
    loading: boolean,
    repositories: Repository[]
}

export const RepositoriesList:FC<Props> = ({repositories, loading}) => {
    if(loading){
        return <PageLoader />
    }
    return <Pagination itemsPerPage={10} className={classNames(cls.list)}>{repositories?.map(repo => <li key={repo.id} className={classNames(cls.list__item)}><RepositoryCard {...repo}/></li>)}</Pagination>
}