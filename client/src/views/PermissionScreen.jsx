import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, CardColumns } from "react-bootstrap";
import { toast } from "react-toastify";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { IoIosRefreshCircle } from "react-icons/io";
import openSocket from "socket.io-client";
import { useAuth } from "../context/auth";
import permissionApi from "../services/permissionServices";
import { uri } from "../config/config";

import AppModal from "../components/Modal/AppModal";
import AppPermissionForm from "../components/Forms/PermissionFrom";
import AppPopOvers from "../components/PopOvers/AppPopOvers";
import AppTextToImage from "../components/AppTextToImage";

const PermissionScreen = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [fetchedPermissions, setFetchedPermissions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [show, setShow] = useState(false);

  let permissions = [];

  useEffect(() => {
    // setDidMount(true);
    const socket = openSocket(uri);

    if (!fetched) loadPermission();
    connectToPermission(socket);

    // return () => setDidMount(false);
  }, []);

  const connectToPermission = (socket) => {
    socket.on("permission", (date) => {
      if (date.action === "create") createPermission(date.permission);
      if (date.action === "update") updatePermission(date.permission);
      if (date.action === "delete") deletePermission(date.permission);
      if (date.action === "deleteAll") deleteAllPermission(date.permissions);
    });
  };

  const loadPermission = async () => {
    const fetchedPermissions = await permissionApi.getAll();
    fetchedPermissions.map((permission) => {
      permission["destination"] = {
        label: "الجهة الموجه لها",
        text: permission["destination"],
      };
      permission["unit"] = { label: "اسم الوحدة", text: permission["unit"] };
      permission["representative"] = {
        label: "مندوب الوحدة",
        text: permission["representative"],
      };
      permission["notes"] = { label: "ملاحظات", text: permission["notes"] };
    });
    permissions = fetchedPermissions.slice(0);

    setFetchedPermissions(fetchedPermissions);
    setFetched(true);
  };

  const createPermission = (permission) => {
    permission["destination"] = {
      label: "الجهة الموجه لها",
      text: permission["destination"],
    };
    permission["unit"] = { label: "اسم الوحدة", text: permission["unit"] };
    permission["representative"] = {
      label: "مندوب الوحدة",
      text: permission["representative"],
    };
    permission["notes"] = { label: "ملاحظات", text: permission["notes"] };

    console.log(permission);
    permissions.unshift(permission);

    setFetchedPermissions(() => [...[], ...permissions]);
  };

  const deletePermission = (permission) => {
    permissions = permissions.filter(function (obj) {
      return obj.permissionId !== permission.permissionId;
    });

    setFetchedPermissions(() => [...[], ...permissions]);
  };

  const deleteAllPermission = () => {
    permissions = [];
    setFetchedPermissions(() => [...[], ...[]]);
  };

  const updatePermission = (permission) => {
    let newPermissions = permissions.slice(0);
    newPermissions.map((obj) => {
      if (obj.permissionId === permission.permissionId) {
        obj["unit"] = permission["unit"];
        obj["representative"] = permission["representative"];
        obj["destination"] = permission["destination"];
        obj["notes"] = permission["notes"];
      }
    });

    setFetchedPermissions(newPermissions);
  };

  const handleDeleteAll = async () => {
    try {
      await permissionApi.removeAll();
      toast.warning("لقد تم حذف كل اذونات الاخراج");
    } catch (error) {
      toast.error("لقد حدث خطأ ما, لم يتم حذف اذونات الاخراج");
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: "10%", left: "10px" }}>
        <AppPopOvers
          title="اعادة تحميل اذونات الاخراج"
          bodyContent="سوف تقوم باعادة تحميل اذونات الاخراج"
        >
          <Button
            variant="secondary"
            style={styles.button}
            onClick={() => history.push("/permissions")}
          >
            <IoIosRefreshCircle size={40} />
          </Button>
        </AppPopOvers>
      </div>
      <div
        style={{
          position: "relative",
          float: "right",
          top: "20px",
          right: "15px",
          display: "flex",
          flexWrap: "wrap",
          flex: "0 0 33.333333%",
          maxWidth: "90%",
        }}
      >
        {fetchedPermissions &&
          fetchedPermissions.map((permission) => {
            return (
              <AppTextToImage
                representative={{
                  ...permission["representative"],
                  ...{ x: 280, y: 30 },
                }}
                unit={{ ...permission["unit"], ...{ x: 302, y: 60 } }}
                destination={{
                  ...permission["destination"],
                  ...{ x: 316, y: 90 },
                }}
                notes={{ ...permission["notes"], ...{ x: 274, y: 120 } }}
                x={90}
                y={50}
              />
            );
          })}
      </div>
      <div style={{ position: "fixed", top: "74%", left: "10px" }}>
        <div>
          <AppPopOvers
            title="انشاء اذن جديد"
            bodyContent="سوف تقوم بانشاء اذن جديد"
          >
            <Button
              variant="primary"
              style={styles.button}
              onClick={() => setShow(true)}
            >
              <AiFillPlusCircle size={40} />
            </Button>
          </AppPopOvers>
        </div>
        <AppPopOvers
          title=" حذف كل الاذونات"
          bodyContent="احذر سوف تقوم بحذف كل الاذونات"
        >
          <Button
            variant="danger"
            style={styles.button}
            onClick={handleDeleteAll}
          >
            <MdDeleteForever size={40} />
          </Button>
        </AppPopOvers>
      </div>
      <AppModal show={show} setShow={setShow} title={"أنشاء اذن خروج   "}>
        <AppPermissionForm setShow={setShow} type="create" />
      </AppModal>
    </>
  );
};

const styles = {
  button: {
    width: "80px",
    height: "80px",
    borderRadius: "40px",
    marginBottom: "10px",
  },
};

export default PermissionScreen;
