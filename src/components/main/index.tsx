import DynamicForm, { getValue, getForm, setForm, setFields, setValues, reRender } from '../../lib/index';
import { page } from '../../components/templates/page';

function Main() {
    page.editMode = false;
    return (
        <DynamicForm data={page}/>
    );
}

export default Main;