/* eslint-disable eqeqeq */
import React from "react";

import MenuButton from "components/MenuButton/MenuButton";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";

function ActionPurchaseIndent(props) {
  const accessToken = `${props.login?.login?.token}`;
  const history = useHistory();

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.create == 1
      ? true
      : false;

  async function deleteSupplier(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDeletePurchaseSalesIndent(id, data);
      }
    });
  }

  return (
    <>
      {updateStatus && (
        <Button
          className="bg-gradient-info text-white ml-3 p-1"
          onClick={(id) => {
            history.push(`/admin/duplicate-purchase-indent/${props.data?.id}`);
          }}
        >
          <i className="fa fa-copy" aria-hidden="true"></i>
        </Button>
      )}

      {deleteStatus && (
        <Button
          className="bg-gradient-danger text-white ml-3 p-1"
          onClick={(id) => {
            deleteSupplier(data.id);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      )}
      {(updateStatus || createStatus) && (
        <MenuButton
          data={props.data}
          index={props.data.id}
          options={props.options}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    portLoading: state.portLoading.portLoading,
    portDischarge: state.portDischarge.portDischarge,
    portDelivery: state.portDelivery.portDelivery,
    commodityAnalysis: state.commodityAnalysis.commodityAnalysis,
    commodity: state.commodity.commodity,
    containerSize: state.containerSize.containerSize,
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
    purchaseSalesIndent: state.purchaseSalesIndent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    onDeletePurchaseSalesIndent: (id, data) =>
      dispatch(actions.deletePurchaseSalesIndent(id, data)),
    onPostPurchaseSalesIndentData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postPurchaseSalesIndentData(data, user, toggle, setSubmitting)
      ),
    updatePurchaseSalesIndentData: (data, user, setSubmitting) =>
      dispatch(
        actions.updatePurchaseSalesIndentData(data, user, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionPurchaseIndent);
