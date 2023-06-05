import { FC, ReactNode, useState } from "react"
import { Controllers } from "./Controllers/Controllers"

type CommonProps = {
    itemsPerPage: number,
    children: ReactNode[],
    className?: string
}

type DefaultProps = {
    onNext: () => void
    onPrev: () => void
    onSelect: () => void
    customControllers: () => JSX.Element
} & CommonProps

type PropsWithControllers = {
    onNext?: never
    onPrev?: never
    onSelect?: never
    customControllers?: never
} & CommonProps


type Props = FC<DefaultProps | PropsWithControllers>

const getPages = (items: number, itemsPerPage:number) => {
    return new Array(Math.round(items / itemsPerPage)).fill(0).map((el, i) => i)
}


export const Pagination:Props = ({onNext, onPrev, onSelect, customControllers:PropsControllers = Controllers, itemsPerPage, children, className}) => {
    const [page, setPage] = useState(0)

    return <div><ul className={className}>{children.slice(page*itemsPerPage, page * itemsPerPage + itemsPerPage)}</ul>{children.length > itemsPerPage && <PropsControllers pages={getPages(children.length, itemsPerPage)} currentPage={page} setPage={setPage}/>}</div>
}