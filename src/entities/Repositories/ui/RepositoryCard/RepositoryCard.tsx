import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

import { Repository } from '../../model/types/repositories';
import { NavLink } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import cls from './RepositoryCard.module.scss';

export const RepositoryCard = memo((props: Repository) => {
    const { name, url, pushedAt, totalCount, id } = props
    const { t } = useTranslation('repositories');

    const date = new Date(pushedAt)

    return (
        <div className={classNames(cls.card, {},)}>
            <div className={classNames(cls.card__header)}>
                <NavLink className={classNames(cls.card__title)} to={RoutePath.repository_details + id.toString()}>{name}</NavLink>
                <span className={classNames(cls.card__pushedAt)}>{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</span>
            </div>
            <div className={classNames(cls.card__body)}>
                <span className={classNames(cls.card__stars)}>
                    stars: {totalCount}
                </span>
                <a target="_blank" href={url} className={classNames(cls.card__link)}>{url}</a>
            </div>
        </div>
    );
});
