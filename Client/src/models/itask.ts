import { ICategory } from './icategory';
import { Ipriority } from './ipriority';
import { Ilocation } from './ilocation';
import { IsubTask } from './isub-task';

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: boolean;
    location: Ilocation
    category: ICategory[];
    dueDate: Date;
    priority: Ipriority;
    remindTime: Date;
    subTask: IsubTask[];
    createdDate: Date;
    updateDate: Date;
}
