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
  var soundTrack = new Audio(
    "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"
  );
  soundTrack.muted = false;

  let permissions = [];

  useEffect(() => {
    // setDidMount(true);
    const socket = openSocket(uri);

    if (!fetched) loadPermission();
    connectToPermission(socket);

    soundTrack.load();
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
    permissions = fetchedPermissions.slice(0);

    setFetchedPermissions(fetchedPermissions);
    setFetched(true);
  };

  const createPermission = (permission) => {
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
          title="اعادة تحميل الاجتماعات"
          bodyContent="سوف تقوم باعادة تحميل الاجتماعات"
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
      <AppTextToImage
        name={[
          { name: "Mohamed", x: 40, y: 50 },
          { name: "", x: 40, y: 70 },
        ]}
        x={40}
        y={50}
      />
      <div style={{ position: "fixed", top: "74%", left: "10px" }}>
        <div>
          <AppPopOvers
            title="انشاء اجتماع جديد"
            bodyContent="سوف تقوم بانشاء اجتماع جديد"
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
          title=" حذف كل الاجتماعات"
          bodyContent="احذر سوف تقوم بحذف كل الاجتماعات"
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
      <AppModal show={show} setShow={setShow} title={"أنشاء اجتماع"}>
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
