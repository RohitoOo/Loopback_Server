import React, { Component } from "react"
import { Box, Text, FormField, TextInput, Button, Select } from "grommet"
import axios from "axios"
import { Formik } from "formik"
// import * as Yup from "yup"
import { observer, inject } from "mobx-react"
import { compose } from "recompose"

class User extends Component {
  state = {}
  render() {
    return (
      <div>
        <Formik
          ref={_ref => (this.rootFormik = _ref)}
          onSubmit={async (values, { resetForm }) => {
            const input = {
              username: values.username,
              email: values.email
            }
            // Save to Database
            this.props.userStore.saveUser(input)

            // Redirect To Next Page

            // this.props.history.push("/partner")

            //

            // resetForm()
          }}
          enableReinitialize
          initialValues={{
            username: "",
            email: ""
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Box pad={"medium"} gap="xsmall" width="large">
                {/* Users */}
                <Box
                  align="center"
                  background="light-1"
                  direction="row"
                  border={{ color: "border", size: "small" }}
                  round="xsmall">
                  <Box justify="center" pad="large">
                    <Text size="large" weight="bold">
                      Register
                    </Text>
                  </Box>
                </Box>

                {/* Invite User  */}
                <Box
                  background="light-1"
                  pad="small"
                  gap="medium"
                  border={{ color: "border", size: "small" }}
                  round="xsmall">
                  <Box gap="small" pad="small" justify="between">
                    <Box>
                      <Text
                        margin="xsmall"
                        color={props.errors.lastName ? "brand" : null}>
                        Username
                      </Text>
                      <FormField>
                        <TextInput
                          type="text"
                          name="username"
                          value={props.values.username}
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>
                    <Box>
                      <Text
                        margin="xsmall"
                        color={props.errors.email ? "brand" : null}>
                        Email
                      </Text>
                      <FormField>
                        <TextInput
                          type="text"
                          name="email"
                          value={props.values.email}
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>

                    <Box justify="end" margin="small">
                      <Button
                        onClick={() => {
                          localStorage.setItem(
                            "currentUser",
                            JSON.stringify({
                              username: props.values.username,
                              email: props.values.email
                            })
                          )
                        }}
                        type="submit"
                        label="Register"
                        color="black"
                        hoverIndicator="brand"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </form>
          )}
        />
      </div>
    )
  }
}

const UserEnhanced = compose(
  inject("userStore"),
  observer
)(User)
export default UserEnhanced
