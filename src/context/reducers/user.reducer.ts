interface userStateI {
  user: string;
}

export const user = (
  state: userStateI,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "PUT_REGISTRATION":
      console.log(action);
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: "" };

    default:
      return state;
  }
};
