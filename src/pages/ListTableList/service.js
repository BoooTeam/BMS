import request from "@/utils/request";

export async function queryRule(params) {
  return request("/api/students/query", {
    params
  });
}
export async function removeRule(params) {
  return request("/api/rule", {
    method: "POST",
    data: { ...params, method: "delete" }
  });
}
export async function addRule(params) {
  return request("/api/students/addStudent", {
    method: "POST",
    data: { ...params }
  });
}
export async function updateRule(params) {
  return request("/api/students/updateStudent", {
    method: "POST",
    data: { ...params }
  });
}

export async function updateEnableing(params) {
  return request("/api/students/updateEnable", {
    method: "POST",
    data: { ...params }
  });
}

export async function deleteInfoing(params) {
  return request("/api/students/deleteInfo", {
    method: "POST",
    data: { ...params }
  });
}
