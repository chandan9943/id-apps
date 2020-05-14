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

import React, { ReactElement } from "react";
import { ResourceList, ResourceListItem, UserAvatar } from "@cicis/react-components";
import { Grid, List } from "semantic-ui-react";
import { history } from "../../helpers";
import { UserListInterface } from "../../models";
import { CommonUtils } from "../../utils";

/**
 * Prop types for the liked accounts component.
 */
interface UsersListProps {
    usersList: UserListInterface;
    handleUserDelete: (userId: string) => void;
}

const listContent = (lastModified: any) => (
    <Grid>
        <Grid.Column width={ 9 }>
            <List.Content>
                <List.Description className="list-item-meta">
                    { lastModified }
                </List.Description>
            </List.Content>
        </Grid.Column>
    </Grid>
);

/**
 * Users info page.
 *
 * @return {JSX.Element}
 */
export const UsersList: React.FunctionComponent<UsersListProps> = (props: UsersListProps): ReactElement => {
    const {
        usersList,
        handleUserDelete
    } = props;

    const handleUserEdit = (userId: string) => {
        history.push(`users/${ userId }`);
    };

    return (
        <ResourceList className="applications-list">
            {
                usersList && usersList.Resources && usersList.Resources instanceof Array &&
                usersList.Resources.map((user, index) => (
                    <ResourceListItem
                        key={ index }
                        actions={ [
                            {
                                icon: "pencil alternate",
                                onClick: () => handleUserEdit(user.id),
                                popupText: "edit",
                                type: "button"
                            },
                            {
                                icon: "trash alternate",
                                onClick: () => handleUserDelete(user.id),
                                popupText: "delete user",
                                type: "button"
                            }
                        ] }
                        actionsFloated="right"
                        avatar={ (
                            <UserAvatar
                                name={ user.userName }
                                size="mini"
                                floated="left"
                                //image={ user.profileUrl }
                            />
                        ) }
                        itemHeader={ user.name && user.name.givenName !== undefined ? user.name.givenName +
                            " " + user.name.familyName : user.userName }
                        itemDescription={ user.emails ? user.emails[0].toString():
                            user.userName }
                        metaContent={ listContent(CommonUtils.humanizeDateDifference(user.meta.lastModified)) }
                        metaColumnWidth={ 6 }
                        descriptionColumnWidth={ 5 }
                    />
                ))
            }
        </ResourceList>
    );
};
