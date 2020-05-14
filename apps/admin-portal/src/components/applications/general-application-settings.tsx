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
import { ContentLoader, DangerZone, DangerZoneGroup } from "@cicis/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { deleteApplication, updateApplicationDetails } from "../../api";
import { GlobalConfig } from "../../configs";
import { ApplicationInterface } from "../../models";
import { GeneralDetailsForm } from "./forms";

/**
 * Proptypes for the applications general details component.
 */
interface GeneralApplicationSettingsInterface {
    /**
     * Application access URL.
     */
    accessUrl?: string;
    /**
     * Currently editing application id.
     */
    appId?: string;
    /**
     * Application description.
     */
    description?: string;
    /**
     * Is the application discoverable.
     */
    discoverability?: boolean;
    /**
     * Application logo URL.
     */
    imageUrl?: string;
    /**
     * Is the application info request loading.
     */
    isLoading?: boolean;
    /**
     * Name of the application.
     */
    name: string;
    /**
     * Callback to be triggered after deleting the application.
     */
    onDelete: () => void;
    /**
     * Callback to update the application details.
     */
    onUpdate: (id: string) => void;
}

/**
 * Component to edit general details of the application.
 *
 * @param {GeneralApplicationSettingsInterface} props - Props injected to the component.
 * @return {ReactElement}
 */
export const GeneralApplicationSettings: FunctionComponent<GeneralApplicationSettingsInterface> = (
    props: GeneralApplicationSettingsInterface
): ReactElement => {

    const {
        appId,
        name,
        description,
        discoverability,
        imageUrl,
        accessUrl,
        isLoading,
        onDelete,
        onUpdate
    } = props;

    const dispatch = useDispatch();

    /**
     * Deletes an application.
     */
    const handleApplicationDelete = (): void => {
        deleteApplication(appId)
            .then((response) => {
                dispatch(addAlert({
                    description: "Successfully deleted the application",
                    level: AlertLevels.SUCCESS,
                    message: "Delete successful"
                }));

                onDelete();
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.description) {
                    dispatch(addAlert({
                        description: error.response.data.description,
                        level: AlertLevels.ERROR,
                        message: "Application Delete Error"
                    }));

                    return;
                }

                dispatch(addAlert({
                    description: "An error occurred while deleting the application",
                    level: AlertLevels.ERROR,
                    message: "Application Delete Error"
                }));
            });
    };

    /**
     * Handles form submit action.
     *
     * @param {ApplicationInterface} updatedDetails - Form values.
     */
    const handleFormSubmit = (updatedDetails: ApplicationInterface): void => {
        updateApplicationDetails(updatedDetails)
            .then((response) => {
                dispatch(addAlert({
                    description: "Successfully updated the application",
                    level: AlertLevels.SUCCESS,
                    message: "Update successful"
                }));

                onUpdate(appId);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.description) {
                    dispatch(addAlert({
                        description: error.response.data.description,
                        level: AlertLevels.ERROR,
                        message: "Update Error"
                    }));

                    return;
                }

                dispatch(addAlert({
                    description: "An error occurred while updating the application",
                    level: AlertLevels.ERROR,
                    message: "Update Error"
                }));
            });
    };

    return (
        !isLoading
            ? (
                <>
                    <GeneralDetailsForm
                        name={ name }
                        appId={ appId }
                        description={ description }
                        discoverability={ discoverability }
                        onSubmit={ handleFormSubmit }
                        imageUrl={ imageUrl }
                        accessUrl={ accessUrl }
                    />
                    { !(GlobalConfig.doNotDeleteApplications.includes(name)) && (
                        <DangerZoneGroup sectionHeader="Danger Zone">
                            <DangerZone
                                actionTitle="Delete application"
                                header="Delete the application"
                                subheader="This action is irreversible. Please proceed with caution."
                                onActionClick={ handleApplicationDelete }
                            />
                        </DangerZoneGroup>
                    ) }
                </>
            )
            : <ContentLoader/>
    );
};
