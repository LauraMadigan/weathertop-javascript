import { userStore } from "../models/user-store.js";
import { stationStore } from "../models/station-store.js";


export const userProfileController = {
  async profile(request, response) {
    const userEmail = request.cookies.user;
    let user = await userStore.getUserByEmail(userEmail); // get user with their email address
    const viewData = {
      title: "Profile",
      user: user
    };
    response.render("user-profile-view", viewData);
  },

  async updateUser(request, response) {
    const userEmail = request.cookies.user;
    let user = await userStore.getUserByEmail(userEmail); // get user with their email address

    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    user.email = request.body.email;

    response.cookie("user", user.email); // update the user email cookie
    
    // Password update handling
    if (
      (request.body.password == '' && request.body.passwordConfirmation == '') || // if password or confirmation is either blank, or don't match
      (request.body.password != request.body.passwordConfirmation)
    ) {
      console.log('Not updating Password!');
    } else {
      // Update the user password
      user.password = request.body.password;
    }

    userStore.updateUser(user);

    const viewData = {
      title: "Profile",
      user: user,
      success: true
    };
    response.render("user-profile-view", viewData);
  },

  async deleteUser(request, response) {
    const userEmail = request.cookies.user;
    let user = await userStore.getUserByEmail(userEmail); // get user with their email address
    stationStore.deleteStationsForUser(user._id); // Delete all of the user stations
    userStore.deleteUserById(user._id); // Delete the user
    response.cookie("user", ""); // remove user email cookie
    response.redirect('/');
  }
};

