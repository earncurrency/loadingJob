<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-indigo-100 p-4">
    <div class="bg-white border border-gray-100 p-8 rounded-lg shadow-xl w-full max-w-sm">
      <!-- <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">เข้าสู่ระบบ</h2> -->
      <div class="flex justify-center items-center mb-6">
        <img class="w-auto h-10 object-cover" :src="`${imageIcon}asiaGray.png`" alt="Logo" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">รหัสพนักงาน</label>
        <!-- <input v-model="form.code" ref="inputCode" placeholder="กรอกรหัสพนักงาน" type="text"
          class="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus-within:ring-offset-2" /> -->

        <input type="text" v-model="form.code" ref="inputCode" placeholder="กรอกรหัสพนักงาน"
          class="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 hover:border-gray-300">
      </div>
      <!-- <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
          <input v-model="form.password" ref="inputUserPassword" placeholder="กรอกรหัสผ่าน" type="password"
            class="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus-within:ring-offset-2" />
        </div> -->
      <button @click="BtnLogin"
        class="w-full cursor-pointer flex-1 bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        เข้าสู่ระบบ
      </button>

    </div>
  </div>
  <swl_modal ref="swl_modal" />
</template>
<script>
import axios from "axios";
import swl_modal from "@/components/swl_modal.vue";

export default {
  components: { swl_modal },
  data() {
    return {
      // apiUrl: __API_URL__,
      imageIcon: __IMG_ICON__,
      authUrl: __AUTH_URL__,
      form: {
        code: "",
        // password: "",
      },
    };
  },
  methods: {
    async BtnLogin() {
      console.log("btn login")
      if (!this.form.code) {
        this.$refs.inputCode.focus();
        return;
      }
      // else if (!this.form.password) {
      //   this.$refs.inputUserPassword.focus();
      //   return;
      // }
      try {
        const postData = {
          code: this.form.code,
        };
        const loginResponse = await axios.post("https://app.asiagroup1999.co.th/app/hr/employee?action=mrsLogin", postData);
        console.log(loginResponse.data)
        if (loginResponse.data.success == true) {
          localStorage.setItem("loadingJobHash", loginResponse.data.hash);
          localStorage.setItem("loadingJobFullname", loginResponse.data.fullname);

          console.log("loadingJobHash : ", localStorage.getItem("loadingJobHash"));
          console.log("loadingJobFullname : ", localStorage.getItem("loadingJobFullname"));
          this.$router.push("/");
        }
        else {
          this.$refs.swl_modal.showAlertModal({
            swlIcon: "warning",
            swlTitle: "ไม่สามารถเข้าสู่ระบบได้",
            swlText: error.response?.data?.detail || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
          });
          console.error(loginResponse.data.errorMsg)
        }
      } catch (error) {
        this.$refs.swl_modal.showAlertModal({
          swlIcon: "warning",
          swlTitle: "ไม่สามารถเข้าสู่ระบบได้",
          swlText: error.response?.data?.detail || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
        });
        console.error("Login error: ", loginResponse.data.errorMsg);
      }
    },
  },
};
</script>
