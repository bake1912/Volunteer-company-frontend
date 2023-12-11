import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';
import React, { memo } from 'react';
import endpoints from '../../../data/endpoint';
import { useUser } from '../../hooks/useUser';

export enum SizeName {
    XS = "XS",
    S = "S",
    M = "M",
    X = "X",
    XL = "XL"
}

export enum TypeName {
    SHOES = "Shoes",
    PANTS = "Pants",
    JACKET = "Jacket",
    TSHIRT = "T-shirt",
    HOODY = "Hoody"
}

export enum SexName {
    MALE = 'Male',
    FEMALE = "Female"
}

export interface IPhoto {
    id: number;
    photo: string;
    itemId: number;
}

export interface IItem {
    id: number;
    name: string;
    description: string;
    sizeName: SizeName;
    typeName: TypeName;
    sexName: SexName;
    photos: IPhoto[]
    isInTable: boolean;
}

const Item = memo((item: IItem) => {
    const photo = item.photos ? `data:image/jpeg;base64,${item.photos[0].photo}` : '';
    const { fetchData } = useUser();
    const deletePhoto = async () => {
        axios.delete(endpoints.items.deleteItem(item.id));
        await fetchData();
    }
    return (
        <Card
            bodyStyle={{ height: 'inherit' }}
            style={{ margin: '16px', width: 160 }}
            cover={photo ? <img style={{ width: 150, height: 150 }} src={photo} /> : null}
        >
            {item.isInTable ?
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <Meta title={item.name} description={item.description} />
                        <p >Size: {item.sizeName}</p>
                        <p >Type: {item.typeName}</p>
                        <p >Sex: {item.sexName}</p>
                        <p>Id: {item.id}</p>
                    </div>
                    <Button onClick={deletePhoto}>Delete</Button>
                </div>
                : null}
        </Card>
    );
});

export default Item;