/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ResourceTab } from "@cicis/react-components";
import React, {FunctionComponent, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { AlertInterface, BasicProfileInterface } from "../../models";
import { addAlert } from "../../store/actions";
import { UserProfile } from "./user-profile";
import {ChangePassword} from "./change-password";
import {ModifyUserRole} from "./modify-role";
import _ from "lodash";
import {Groups} from "../../models/groups";
import {getGroupsList} from "../../api";


interface EditUserPropsInterface {
    user: BasicProfileInterface;
    setUser: (userInfo: BasicProfileInterface) => void;
}

/**
 * Application edit component.
 *
 * @return {JSX.Element}
 */
export const EditUser: FunctionComponent<EditUserPropsInterface> = (
    props: EditUserPropsInterface
): JSX.Element => {
    const [ rolesList, setRolesList ] = useState([]);
    const {
        user,
        setUser
    } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        getGroupsList(undefined, undefined, undefined/*'urn:ietf:params:scim:schemas:extension:ibm:2.0:Group:groupType eq "standard"'*/)
            .then((response) => {
                if (response.status === 200) {
                    const rolesList: Array<Groups> = response.data.Resources;
                    setRolesList(rolesList);
                }
            });
    }, []);

    const handleAlerts = (alert: AlertInterface) => {
        dispatch(addAlert(alert));
    };

    const panes = () => ([

        {
            menuItem: "Overview",
            render: () => (
                <ResourceTab.Pane attached={ false }>
                    <ChangePassword onAlertFired={ handleAlerts }  user={ user } setUser={ setUser }/>
                </ResourceTab.Pane>
            ),
        },
        {
            menuItem: "Attributes",
            render: () => (
                <ResourceTab.Pane attached={ false }>
                    <UserProfile onAlertFired={ handleAlerts }  user={ user } setUser={ setUser }/>
                </ResourceTab.Pane>
            ),
        },{
            menuItem: "Roles",
            render: () => (
                <ResourceTab.Pane attached={ false }>
                    <ModifyUserRole onAlertFired={ handleAlerts }  user={ user } setUser={ setUser } rolesList={ rolesList }  setRolesList={ setRolesList } />
                </ResourceTab.Pane>
            ),
        }

    ]);

    return (
        <ResourceTab
            panes={ panes() }
        />
    );
};
