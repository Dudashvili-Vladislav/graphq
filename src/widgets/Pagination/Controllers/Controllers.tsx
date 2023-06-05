import { Dispatch, FC, SetStateAction, useState } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Controllers.module.scss"

type Props = {
    setPage: Dispatch<SetStateAction<number>>,
    currentPage: number,
    pages: number[]
}

export const Controllers: FC<Props> = ({ pages, currentPage, setPage }) => {
    const [currentGroup, setCurrentGroup] = useState(0) // Состояние, которое отвечает за то, какие страницы сейчас отображаются (например 0-10, или 11-20)
    const handlePrev = () => {
        if(currentPage === 0){
            setPage(pages.length - 1)
            setCurrentGroup(Math.round(pages.length / 10))
        }else{
            setPage(currentPage - 1)
            console.log(currentPage)
            if((currentPage) % 10 == 0){
                setCurrentGroup(group => group-1)
            }
        }
    }

    const handleNext = () => {
        if(currentPage === pages.length - 1){
            setPage(0)
            setCurrentGroup(0)
        }else{
            setPage(prev => prev + 1)
            if((currentPage + 1) % 10 == 0){
                setCurrentGroup(group => group+1)
            }
            
        }
    }
    
    return (
        <div className={cls["controllers"]}>
            <div onClick={handlePrev} className={cls.prev}>{"←"}</div>
            <ul className={cls["controllers-list"]}>
                {(pages.length > 10 ? pages.slice(currentGroup * 10, currentGroup*10 + 10) : pages).map(page => (
                    <li key={page}
                        onClick={() => setPage(page)} 
                        className={classNames(cls["controller-item"], { [cls.active]: page === currentPage })}>
                        {page + 1}
                    </li>
                ))}
            </ul>
            <div onClick={handleNext} className={cls.next}>{"→"}</div>
        </div>
    )
}