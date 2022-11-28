import { useState } from 'react';
import '../../App.css';

import DynamicForm from '../../lib/index';
import { DynamicFormSchema } from '../../lib/models/dynamic-form-schema';
import { Col, Row } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

const Builder = (props: any): JSX.Element => {
    const navigate = useNavigate();


    const menuTemplates: DynamicFormSchema = {
        name: "menuTemplates",
        mode: "layout",
        //editMode: true,
        fields: {
            menu: {
                type: 'menu',
                menuOptions: [
                    {
                        label: "Main Page",
                        key: "mainPage",
                    },
                    {
                        label: "Input",
                        key: "input",
                    },
                    {
                        label: "Dropdown",
                        key: "dropdown",
                    },
                    {
                        label: "Autocomplete",
                        key: "autocomplete",
                    },
                    {
                        label: "Checkbox",
                        key: "checkbox",
                    },
                    {
                        label: "Radio",
                        key: "radio",
                    },


                    //   {
                    //     label: "Input",
                    //     key: "input",
                    //   },
                    //   {
                    //     label: "Input",
                    //     key: "input",
                    //   },

                ],
                onSelect: (props: any) => {
                    navigate('/builder/' + props.key);
                   // console.log('onSelect', props)
                }
                //label: "First Name",
            },


        }
    }
    return (
        <Row>
            <Col flex={'200px'} >
                <DynamicForm
                    data={menuTemplates}
                />
            </Col>
            <Col flex={'calc(100% - 200px)'}>
                <Outlet />
            </Col>
        </Row>

    );
}
export default Builder;