/**
* Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
*
* cic Inc. licenses this file to you under the Apache License,
* Version 2.0 (the 'License'); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import React, { useState } from "react";
import { ResourceList, LinkButton, PrimaryButton } from "@cicis/react-components"
import { Claim, ExternalClaim, ClaimDialect, AlertLevels } from "../../models";
import { List, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { history } from "../../helpers";
import { deleteAClaim, updateAClaim, deleteAnExternalClaim, deleteADialect } from "../../api";
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/actions";

export enum ListType {
    LOCAL,
    EXTERNAL,
    DIALECT
};

interface ClaimsListPropsInterface {
    list: Claim[] | ExternalClaim[] | ClaimDialect[];
    localClaim: ListType;
    openEdit?: (id: string) => void;
    update: () => void;
    dialectID?: string;
}
export const ClaimsList = (props: ClaimsListPropsInterface): React.ReactElement => {

    const { list, localClaim, openEdit, update, dialectID } = props;

    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState<ListType>(null);
    const [deleteID, setDeleteID] = useState<string>(null);

    const dispatch = useDispatch();

    const isLocalClaim = (toBeDetermined: Claim[] | ExternalClaim[] | ClaimDialect[]): toBeDetermined is Claim[] => {
        return localClaim === ListType.LOCAL;
    }

    const isDialect = (
        toBeDetermined: Claim[] | ExternalClaim[] | ClaimDialect[]
    ): toBeDetermined is ClaimDialect[] => {
        return localClaim === ListType.DIALECT
    }

    const listContent = (content: any): React.ReactElement => (
        <List.Content>
            <List.Description className="list-item-meta">
                {content}
            </List.Description>
        </List.Content>
    );

    const deleteLocalClaim = (id: string) => {
        deleteAClaim(id).then(response => {
            update();
            closeDeleteConfirm();
            dispatch(addAlert(
                {
                    description: "The local claim has been deleted successfully!",
                    level: AlertLevels.SUCCESS,
                    message: "Local claim deleted successfully"
                }
            ));
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description,
                    level: AlertLevels.ERROR,
                    message: error?.message
                }
            ));
        })
    };

    const deleteExternalClaim = (dialectID: string, claimID: string) => {
        deleteAnExternalClaim(dialectID, claimID).then(response => {
            update();
            closeDeleteConfirm();
            dispatch(addAlert(
                {
                    description: "The external claim has been deleted successfully!",
                    level: AlertLevels.SUCCESS,
                    message: "External claim deleted successfully"
                }
            ));
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description,
                    level: AlertLevels.ERROR,
                    message: error?.message
                }
            ));
        })
    };

    const deleteDialect = (dialectID: string) => {
        deleteADialect(dialectID).then(response => {
            update();
            closeDeleteConfirm();
            dispatch(addAlert(
                {
                    description: "The dialect has been deleted successfully!",
                    level: AlertLevels.SUCCESS,
                    message: "Dialect deleted successfully"
                }
            ));
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description,
                    level: AlertLevels.ERROR,
                    message: error?.message
                }
            ));
        })
    };

    const showDeleteConfirm = (): React.ReactElement => {
        return (
            <Modal
                open={deleteConfirm}
                onClose={closeDeleteConfirm}
                size="mini"
                dimmer="blurring"
            >
                <Modal.Header>
                    Confirm Delete
                </Modal.Header>
                <Modal.Content>
                    This will completely delete the
                    {
                        deleteType === ListType.DIALECT
                            ? " Claim Dialect. "
                            : deleteType === ListType.EXTERNAL
                                ? " External Claim. "
                                : " Local Claim. "
                    }
                    Do you want to continue deleting it? 
                </Modal.Content>
                <Modal.Actions>
                    <LinkButton onClick={closeDeleteConfirm}>
                        Cancel
                    </LinkButton>
                    <PrimaryButton onClick={() => {
                        switch (deleteType) {
                            case ListType.DIALECT:
                                deleteDialect(deleteID);
                                break;
                            case ListType.EXTERNAL:
                                deleteExternalClaim(dialectID, deleteID);
                                break;
                            case ListType.LOCAL:
                                deleteLocalClaim(deleteID);
                                break;
                        }
                    }}>
                        Delete
                    </PrimaryButton>
                </Modal.Actions>
            </Modal>
        )
    };

    const initDelete = (type: ListType, id: string) => {
        setDeleteType(type);
        setDeleteID(id);
        setDeleteConfirm(true);
    };

    const closeDeleteConfirm = () => {
        setDeleteConfirm(false);
        setDeleteID(null);
        setDeleteType(null);
    }

    return (
        <>
            {deleteConfirm ? showDeleteConfirm() : null}
            <ResourceList>
                {
                    isLocalClaim(list)
                        ? list?.map((claim: Claim, index: number) => {
                            return (
                                <ResourceList.Item
                                    key={index}
                                    actions={[
                                        {
                                            icon: "pencil alternate",
                                            onClick: () => {
                                                history.push("/edit-local-claims/" + claim?.id)
                                            },
                                            popupText: "edit",
                                            type: "button"
                                        },
                                        {
                                            icon: "trash alternate",
                                            onClick: () => { initDelete(ListType.LOCAL, claim?.id) },
                                            popupText: "delete",
                                            type: "dropdown"
                                        }
                                    ]}
                                    actionsFloated="right"
                                    itemHeader={claim.displayName}
                                    metaContent={listContent(claim.description)}
                                />
                            )
                        })
                        : isDialect(list)
                            ? list?.map((dialect: ClaimDialect, index: number) => {
                                return (
                                    <ResourceList.Item
                                        key={index}
                                        actions={[
                                            {
                                                icon: "pencil alternate",
                                                onClick: () => {
                                                    openEdit(dialect.id);
                                                },
                                                popupText: "edit",
                                                type: "button"
                                            },
                                            {
                                                icon: "trash alternate",
                                                onClick: () => { initDelete(ListType.DIALECT, dialect?.id) },
                                                popupText: "delete",
                                                type: "dropdown"
                                            }
                                        ]}
                                        actionsFloated="right"
                                        itemHeader={(
                                            <Link to={"/external-claims/" + dialect.id} >{dialect.dialectURI}</Link>
                                        )}
                                    />
                                )
                            })
                            : list?.map((claim: ExternalClaim, index: number) => {
                                return (
                                    <ResourceList.Item
                                        key={index}
                                        actions={[
                                            {
                                                icon: "pencil alternate",
                                                onClick: () => {
                                                    openEdit(claim?.id);
                                                },
                                                popupText: "edit",
                                                type: "button"
                                            },
                                            {
                                                icon: "trash alternate",
                                                onClick: () => { initDelete(ListType.EXTERNAL, claim?.id) },
                                                popupText: "delete",
                                                type: "dropdown"
                                            }
                                        ]}
                                        actionsFloated="right"
                                        itemHeader={claim.claimURI}
                                        metaContent={listContent(claim.mappedLocalClaimURI)}
                                    />
                                )
                            })
                }
            </ResourceList>
        </>
    )
};
