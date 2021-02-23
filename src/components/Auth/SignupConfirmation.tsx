import React, {useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {API, Auth} from "aws-amplify";
import {setCurrentUser} from "../../redux/actions/currentUser";
import {onError} from "../../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../LoaderButton";
import {useAppContext} from "../../libs/contextLib";
import {FieldState, LoadingState} from "../../types";

interface ISignupConfirmationProps {
  dispatch: Function;
  fieldState: FieldState;
  loadingState: LoadingState;
}

const SignupConfirmation = (props: ISignupConfirmationProps) => {
  const {
    dispatch,
    fieldState: {fields, handleFieldChange},
    loadingState: {isLoading, setIsLoading},
  } = props;

  const history = useHistory();
  // @ts-ignore
  const {userHasAuthenticated} = useAppContext();

  const validateForm = () => {
    return fields.confirmationCode.length > 0;
  }

  const createUser = () => {
    return API.post('mapapp', '/user', {});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      const user = await createUser();
      dispatch(setCurrentUser(user.data));
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <header>Confirm account</header>
      {/*@ts-ignore*/}
      <Form.Group controlId="confirmationCode" size="lg">
        <Form.Label>Confirmation Code</Form.Label>
        <Form.Control
          autoFocus
          type="tel"
          onChange={handleFieldChange}
          value={fields.confirmationCode}
        />
        <Form.Text muted>Please check your email for the code.</Form.Text>
      </Form.Group>
      <LoaderButton
        block
        size="lg"
        type="submit"
        variant="success"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Verify
      </LoaderButton>
    </Form>
  );
}

const mapStateToProps = (state: { errors: any; currentUser: any }) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(SignupConfirmation);
