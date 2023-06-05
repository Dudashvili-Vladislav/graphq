import React, { useState } from 'react';
import { RepositoriesList, useRepositories } from 'entities/Repositories';
import Search from 'widgets/Search';
import cls from './MainPage.module.scss';

const MainPage = () => {
    const { data, loading, error } = useRepositories()

    return (
			<div>
				<div className={cls.wrapper_top}>
					Репозитории
					<Search />
				</div>
				<div className={cls.wrapper_data}>
				<RepositoriesList repositories={data} loading={loading}/>
				</div>
			</div>
    );
};

export default MainPage;
