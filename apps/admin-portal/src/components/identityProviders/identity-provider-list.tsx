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

import { AlertLevels } from "@cicis/core/models";
import { addAlert } from "@cicis/core/store";
import { AppAvatar, ResourceList } from "@cicis/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { history } from "../../helpers";
import { deleteIdentityProvider } from "../../api";
import { IdentityProviderListResponseInterface } from "../../models";

/**
 * Proptypes for the identity provider list component.
 */
interface IdentityProviderListPropsInterface {
    list: IdentityProviderListResponseInterface;
    onIdentityProviderDelete: () => void;
}

/**
 * Identity provider list component.
 *
 * @param {IdentityProviderListPropsInterface} props Props injected to the component.
 * @return {React.ReactElement}
 */
export const IdentityProviderList: FunctionComponent<IdentityProviderListPropsInterface> = (
    props: IdentityProviderListPropsInterface
): ReactElement => {

    const {
        list,
        onIdentityProviderDelete
    } = props;

    const dispatch = useDispatch();

    /**
     * Redirects to the identity provider edit page when the edit button is clicked.
     *
     * @param {string} idpId Identity provider id.
     */
    const handleIdentityProviderEdit = (idpId: string): void => {
        history.push(`identity-providers/${ idpId }`);
    };

    /**
     * Deletes an identity provider when the delete identity provider button is clicked.
     *
     * @param {string} idpId Identity provider id.
     */
    const handleIdentityProviderDelete = (idpId: string): void => {
        deleteIdentityProvider(idpId)
            .then((response) => {
                dispatch(addAlert({
                    description: "Successfully deleted the identity provider",
                    level: AlertLevels.SUCCESS,
                    message: "Delete successful"
                }));

                onIdentityProviderDelete();
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.description) {
                    dispatch(addAlert({
                        description: error.response.data.description,
                        level: AlertLevels.ERROR,
                        message: "Identity Provider Delete Error"
                    }));

                    return;
                }

                dispatch(addAlert({
                    description: "An error occurred while deleting the identity provider",
                    level: AlertLevels.ERROR,
                    message: "Identity Provider Delete Error"
                }));
            });
    };

    return (
        <ResourceList className="applications-list">
            {
                list.identityProviders.map((idp, index) => {
                    // TODO Remove this check and move the logic to backend.
                    if ("LOCAL" !== idp.name) {
                        return (
                            <ResourceList.Item
                                key={ index }
                                actions={ [
                                    {
                                        icon: "pencil alternate",
                                        onClick: (): void => handleIdentityProviderEdit(idp.id),
                                        popupText: "edit",
                                        type: "button"
                                    },
                                    {
                                        icon: "trash alternate",
                                        onClick: (): void => handleIdentityProviderDelete(idp.id),
                                        popupText: "delete",
                                        type: "dropdown"
                                    }
                                ] }
                                actionsFloated="right"
                                avatar={ (
                                    <AppAvatar
                                        name={ idp.name }
                                        image={ idp.image }
                                        size="mini"
                                        floated="left"
                                    />
                                ) }
                                itemHeader={ idp.name }
                                itemDescription={ idp.description }
                            />
                        );
                    }
                })
            }
        </ResourceList>
    );
};
