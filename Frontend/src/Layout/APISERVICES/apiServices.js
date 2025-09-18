import axios from "axios";
import * as qs from "qs";

const BASE_URL = "http://localhost:3009/api/";
export const BASE_IMAGE_URL = "http://localhost:3009/";

class apiServices {
  //fetching token

  getToken() {
    const token = sessionStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Categories
  addCategory(data) {
    return axios.post(BASE_URL + "category/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getallCategory(data) {
    return axios.post(BASE_URL + "category/getall", qs.stringify(data));
  }

    getsingleCategory(data) {
        return axios.post(BASE_URL + "category/getsingle", qs.stringify(data));
    }

  deleteCategoryData(data) {
    return axios.post(BASE_URL + "category/delete", qs.stringify(data));
  }

  updateCategoryData(data) {
    return axios.post(BASE_URL + `category/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...this.getToken(),
      },
    });
  }

  // Owners
  ownerRegister(data) {
    return axios.post(BASE_URL + "owner/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...this.getToken(),
      },
    });
  }

  getsingleOwnerData(data) {
    return axios.post(BASE_URL + "owner/getsingle", qs.stringify(data));
  }

  getallOwnersData(data) {
    return axios.post(BASE_URL + "owner/getall", qs.stringify(data));
  }

  updateOwnerData(data) {
    return axios.post(BASE_URL + "owner/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...this.getToken(),
      },
    });
  }

  updateOwnerStatus(data) {
    return axios.post(BASE_URL + "owner/updatestatus", data);
  }

  // Customers
  userRegister(data) {
    return axios.post(BASE_URL + "customer/register", data);
  }

    getallCustomerData(data) {
        return axios.post(BASE_URL + "customer/getall", qs.stringify(data));
    }

  // Queries
  addQuery(data) {
    return axios.post(BASE_URL + "query/add", data);
  }

    getallQueries(data) {
        return axios.post(BASE_URL + "query/getall", qs.stringify(data));
    }
  // Login / User Management
  login(data) {
    return axios.post(BASE_URL + "user/login", data);
  }

  updateUserStatus(data) {
    return axios.post(BASE_URL + "user/updatestatus", data);
  }

  // Vehicles
  addVehicle(data) {
    return axios.post(BASE_URL + "vehicle/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getallVehicles(data) {
    return axios.post(BASE_URL + "vehicle/getall", qs.stringify(data));
  }

  deleteVehicleData(data) {
    return axios.post(BASE_URL + "vehicle/delete", data);
  }

  getsingleVehicleData(id) {
    return axios.post(
      `${BASE_URL}vehicle/getsingle`,
      { id },
      { headers: this.getToken() }
    );
  }

  updateVehicleData(data) {
    return axios.post(BASE_URL + "vehicle/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Vehicle Availability
  addVehicleAvailabilityData(data) {
    return axios.post(BASE_URL + "availability/add", data);
  }

    getallVehicleAvailabilityData(data) {
        return axios.post(BASE_URL + "availability/getall", qs.stringify(data));
    }

  deleteVehicleAvailabilityData(data) {
    return axios.post(BASE_URL + "availability/delete", qs.stringify(data));
  }
    getsingleVehicleAvailabilityData(data) {
        return axios.post(BASE_URL + "availability/getsingle", qs.stringify(data));
    }

  updateVehicleAvailabilityData(data) {
    return axios.post(BASE_URL + "availability/update", data);
  }

  // Penalty Rules
  addPenaltyRules(data) {
    return axios.post(BASE_URL + "penaltyrules/add", data);
  }

  getallPenaltyRulesData(data) {
    return axios.post(BASE_URL + "penaltyrules/getall", qs.stringify(data));
  }

    getsinglePenaltyRules(data) {
        return axios.post(BASE_URL + "penaltyrules/getsingle", qs.stringify(data));
    }

  deletePenaltyRulesData(data) {
    return axios.post(BASE_URL + "penaltyrules/delete", qs.stringify(data));
  }

  updatePenaltyRulesData(data) {
    return axios.post(BASE_URL + "penaltyrules/update", data);
  }

  // Renting
  addRentingData(data) {
    return axios.post(BASE_URL + "renting/add", data);
  }

    getallRentedData(data) {
        return axios.post(BASE_URL + "renting/getall", qs.stringify(data));
    }

  getsingleRentedData(data) {
    return axios.post(BASE_URL + "renting/getsingle", data, {
      headers: this.getToken(),
    });
  }

  updateRentingStatus(data) {
    return axios.post(BASE_URL + "renting/updatestatus", data);
  }

  // Penalty
  addPenalty(data) {
    return axios.post(BASE_URL + "penalty/add", data);
  }

  getallPenaltyData(data) {
    return axios.post(BASE_URL + "penalty/getall", qs.stringify(data));
  }

  updatePenaltyPaymentStatus(data) {
    return axios.post(BASE_URL + "penalty/updatepaymentstatus", data);
  }
  updatePenaltyStatus(data) {
    return axios.post(BASE_URL + "penalty/updatestatus", data);
  }
  deletePenaltyData(data) {
    return axios.post(BASE_URL + "penalty/delete", qs.stringify(data));
  }

  updatePenaltyData(data) {
    return axios.post(BASE_URL + "penalty/update", data);
  }

    getsinglePenaltyData(data) {
        return axios.post(BASE_URL + "penalty/getsingle", qs.stringify(data));
    }

  // ✅ Stripe Payment Integration
  createCheckoutSession(data) {
    return axios.post(BASE_URL + "create-checkout-session", data);
  }
}

export default new apiServices();
