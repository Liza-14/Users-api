import { Client } from "cassandra-driver";

function createConection() {
  return new Client({
    cloud: {
      secureConnectBundle: "./secure-connect-users.zip",
    },
    credentials: {
      username: "HFDWYpdHoEcWQbRCtMOIUFjp",
      password: "ZxbaARInH_uq3GUoqbzx+ygRwpi2ZMaHtBH_rsEa_3YkoWlcAune1iIOaxtu7AEiMwpFENbaxlBH,Q4+gO6YIqqsbeNr_ZclacRI6-xJKssQ6ZS95ySXyL.6xM9f01,d",
    },
  });
}

export default createConection;
