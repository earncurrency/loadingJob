<template>
    <navbar />
    <div class=" py-8 px-4 mt-6" style="min-height: calc(100vh - 5rem);">
        <div class="max-w-lg mx-auto">
            <!-- Header Card -->
            <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden mb-6">
                <div class="bg-gradient-to-r from-indigo-600 to-blue-400 px-6 py-8 text-center">
                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-file-invoice text-white text-2xl"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-white mb-2">บันทึกการขึ้นสินค้า</h2>
                    <p class="text-gray-100 text-sm">{{ formData.fullname }}</p>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white border border-gray-100 rounded-2xl shadow-xl border-0 p-8">
                <form @submit.prevent="submitForm" class="space-y-6">

                    <div class="space-y-2">
                        <label class="flex items-center text-sm font-semibold text-gray-800 mb-3">
                            <i class="fas fa-hashtag text-gray-600 mr-2"></i>
                            เลขที่ใบส่งของ (KA)
                        </label>
                        <div class="relative w-full" ref="doCodeDropdown">
                            <input type="text" v-model="formData.doCode" ref="inputDoCode" @input="searchDoCode"
                                placeholder="กรุณากรอกเลขที่ใบส่งของ" class="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl 
                                       focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 
                                       transition-all duration-300 hover:border-gray-300">

                            <div v-if="formData.doCode !== '' && openListDoCode"
                                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                                :style="{ top: '100%' }">
                                <!-- กรณีพบลูกค้า -->
                                <div v-if="results.length > 0">
                                    <div v-for="docode in results" :key="docode.id"
                                        @mousedown.prevent="selectDocode(docode)"
                                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">

                                        <div class="flex flex-col gap-1 text-sm">
                                            <div class="flex">
                                                <span
                                                    class="font-medium text-gray-900 flex-shrink-0 w-28">เลขที่ใบส่งของ :</span>
                                                <span class="font-normal text-gray-700 break-words">{{ docode.code
                                                    }}</span>
                                            </div>

                                            <div v-if="docode.customerName" class="flex">
                                                <span
                                                    class="font-medium text-gray-900 flex-shrink-0 w-28">ลูกค้า :</span>
                                                <span class="font-normal text-gray-700 break-words">{{
                                                    docode.customerName }}</span>
                                            </div>

                                            <div v-if="docode.projectCode && docode.projectAddress" class="flex">
                                                <span
                                                    class="font-medium text-gray-900 flex-shrink-0 w-28">หน่วยงาน :</span>
                                                <span class="font-normal text-gray-700 break-words">{{
                                                    docode.projectCode }} {{ docode.projectAddress }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- ไม่พบข้อมูลใบส่งของ -->
                                <div v-else class="px-3 py-2 text-gray-500 text-sm text-center">ไม่พบข้อมูลใบส่งของ
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="flex items-center text-sm font-semibold text-gray-800 mb-3">
                            <i class="fa-solid fa-users text-gray-600 mr-2"></i>
                            ลูกค้า
                        </label>
                        <div class="relative">
                            <input type="text" v-model="formData.customerName" placeholder="ลูกค้า" class="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-xl 
                                       focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 
                                       transition-all duration-300 hover:border-gray-300" disabled>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center text-sm font-semibold text-gray-800 mb-3">
                            <i class="fas fa-hashtag text-gray-600 mr-2"></i>
                            หน่วยงาน
                        </label>
                        <div class="relative">
                            <textarea v-model="project" rows="3" placeholder="หน่วยงาน"
                                class="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 hover:border-gray-300"
                                disabled>
                            </textarea>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="flex items-center text-sm font-semibold text-gray-800 mb-3">
                            <i class="fas fa-car text-gray-600 mr-2"></i>
                            ทะเบียนรถ
                        </label>
                        <div class="relative">
                            <input type="text" v-model="formData.registration" ref="inputRegistration"
                                placeholder="กรุณากรอกทะเบียนรถ" class="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl 
                                       focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 
                                       transition-all duration-300 hover:border-gray-300">
                        </div>
                    </div>

                    <!-- Additional Info Card -->
                    <div class="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-info-circle text-blue-600 text-sm"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-blue-900">ข้อมูลเพิ่มเติม</p>
                                <p class="text-xs text-blue-700">กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก</p>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="cursor-pointer flex-1 bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg 
                                   hover:bg-gray-700 transition-colors duration-200 
                                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            บันทึก
                        </button>

                        <button type="button" @click="resetForm" class="cursor-pointer px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg 
                                   hover:bg-gray-50 transition-colors duration-200 
                                   focus:outline-none focus:ring-2 focus:ring-gray-300">
                            <i class="fas fa-undo text-xs"></i>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Footer Info -->
            <div class="text-center mt-8">
                <p class="text-xs text-gray-500">
                    <i class="fas fa-clipboard-list mr-1"></i>
                    ระบบบันทึกการขึ้นสินค้า • เวอร์ชัน 1.0
                </p>
            </div>
        </div>
    </div>
    <swl_modal ref="swl_modal" />
</template>

<script>
import axios from "axios";
import swl_modal from "@/components/swl_modal.vue";
import navbar from "@/components/navbar.vue";

export default {
    components: { navbar, swl_modal },
    data() {
        return {
            formData: {
                doCode: "",
                registration: "",
                fullname: "",
                customerName: "",
                projectCode: "",
                projectAddress: "",
            },
            project: "",
            results: [],
            openListDoCode: false,

        };
    },
    mounted() {
        this.setData();
    },
    methods: {
        setData() {
            this.formData.fullname = localStorage.getItem("loadingJobFullname");
        },
        async searchDoCode() {

            if (!this.formData.doCode.trim()) {
                this.results = [];
                this.openListDoCode = false;
                return;
            }
            this.openListDoCode = true;

            try {
                const response = await axios.get(
                    "https://app.asiagroup1999.co.th/app/cst/delivery-fg?action=listDelivery&rows=10&doCode=" + this.formData.doCode
                );
                const data = response.data;
                this.results = data.rows;

                console.log("data :", this.results);

            } catch (error) {
                console.error("Error :", error);
                this.results = [];
            }
        },
        selectDocode(docode) {
            this.formData.doCode = docode.code;
            this.formData.customerName = docode.customerName;
            this.formData.projectCode = docode.projectCode;
            this.formData.projectAddress = docode.projectAddress;
            this.project = docode.projectCode + ' ' + docode.projectAddress;
            this.openListDoCode = false;
            console.log("selected do code :", this.formData)
        },


        resetForm() {
            this.formData.doCode = "";
            this.formData.customerName = "";
            this.project = "";
            this.formData.projectCode = "";
            this.formData.projectAddress = "";
            this.formData.registration = "";
        },
        submitForm() {

            if (!this.formData.fullname) {
                this.$refs.swl_modal.showAlertModal({
                    swlIcon: "warning",
                    swlTitle: "ไม่พบผู้ใช้งาน",
                    swlText: `กรูณาเข้าสู่ระบบ`,
                });
                this.$router.push("/login");
                return;
            } else if (!this.formData.doCode) {
                this.$refs.inputDoCode.focus();
                return;
            } else if (!this.formData.registration) {
                this.$refs.inputRegistration.focus();
                return;
            }
            // Submit logic here
            this.$refs.swl_modal.showAlertModal({
                swlIcon: "success",
                swlTitle: "บันทึกสำเร็จ",
                swlText: `บันทึกใบส่งของเลขที่ ${this.formData.doCode} เรียบร้อยแล้ว`,
            });
            console.log('Form data:', this.formData);
            this.resetForm();

        }
    }
};
</script>