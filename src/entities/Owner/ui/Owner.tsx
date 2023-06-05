import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { IOwner } from "../model/types/model";
import cls from "./Owner.module.scss"

export const Owner: FC<IOwner> = ({ avatarUrl, login, url }) => {
    return (
        <div className={classNames(cls.owner)}>
            <img className={classNames(cls.owner__avatar)} 
                src={avatarUrl} 
                alt="avatar" 
                width="70" 
                height="70" 
            />
            <a className={classNames(cls.owner__name)} 
                target="_blank" 
                href={url}>{login}
            </a>
        </div>
    )
}