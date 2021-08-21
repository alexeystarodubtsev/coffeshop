import React from 'react';
import { useSelector } from 'react-redux';
import { ModelState } from '../reducer';
import { GoodsCard } from './GoodsCard';
import './GoodsList.scss';

const CLASS = 'goods-list';

export const GoodsList: React.FC = () => {
    const goods = useSelector<ModelState>(state => state.goods) as ModelState['goods'];
    return (
        <div className={CLASS}>
            {Object.values(goods).map(g => (
                <div key={g.name} className={`${CLASS}__item`}>
                    <GoodsCard {...g} />
                </div>
            ))}
        </div>
    );
};
