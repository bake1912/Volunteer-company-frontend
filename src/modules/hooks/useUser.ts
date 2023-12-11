import axios from "axios";
import { IItem, IPhoto } from "../items/component/Item";
import endpoints from "../../data/endpoint";
import { useDispatch } from "react-redux";
import { setItems } from "../../redux/slice/item-slice";

export const useUser = () => {
    const dispatch = useDispatch();
    const fetchData = async () => {
        const itemsResponse = await axios.get(endpoints.items.getAll);
        const items: IItem[] = itemsResponse.data;
        Promise.all(items.map(async (item) => {
            const photos: IPhoto[] = (await axios.get(endpoints.items.getPhotoAll(item.id))).data;
            if (photos) {
                return { ...item, photos: photos };
            } else {
                return item;
            }
        })).then((result) => dispatch(setItems(result)));
    };
    return { fetchData };
}