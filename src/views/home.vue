<template>
    <navbar />
    <div class=" py-8 px-4 mt-6" style="min-height: calc(100vh);">
        <div class="max-w-lg mx-auto">
            <!-- Header Card -->
            <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6">
                <div class="bg-white px-6 py-8 text-center">
                    <div
                        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4  border border-gray-200 shadow-base">
                        <i class="fas fa-file-invoice text-gray-600 text-2xl"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">บันทึกการขึ้นสินค้า</h2>
                    <p v-if="formData.employeeName" class="text-gray-900 text-base">{{ formData.employeeName }}</p>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
                <form @submit.prevent="submitForm" class="space-y-6">

                    <div class="space-y-2">
                        <label class="flex items-center text-base font-semibold text-gray-800 mb-3">
                            <i class="fas fa-hashtag text-gray-600 mr-2"></i>
                            เลขที่ใบส่งของ (KA)
                        </label>
                        <div class="relative w-full" ref="doCodeDropdown">
                            <input type="text" v-model="formData.doCode" @blur="formData.doCode = formData.tpmDoCode"
                                ref="inputDoCode" @input="getListDelivery" placeholder="กรุณากรอกเลขที่ใบส่งของ" class="w-full px-4 py-2 text-base bg-white border border-gray-200 rounded-xl 
                                       focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 
                                       transition-all duration-300 hover:border-gray-300">

                            <div v-if="formData.doCode !== '' && openListDelivery"
                                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-auto overflow-y-auto"
                                :style="{ top: '100%' }">
                                <!-- กรณีพบลูกค้า -->
                                <div v-if="listDelivery.length > 0">
                                    <div v-for="detail in listDelivery" :key="detail.id"
                                        @mousedown.prevent="selectDocode(detail)"
                                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">

                                        <div class="flex flex-col gap-1 text-base">
                                            <div v-if="detail.code" class="flex">
                                                <span class="font-bold text-gray-900 flex-shrink-0 w-28">เลขที่ใบส่งของ
                                                    :</span>
                                                <span class="font-normal text-gray-700 break-words">{{ detail.code
                                                    }}</span>
                                            </div>

                                            <div v-if="detail.customerName" class="flex">
                                                <span class="font-bold text-gray-900 flex-shrink-0 w-28">ลูกค้า
                                                    :</span>
                                                <span class="font-normal text-gray-700 break-words">{{
                                                    detail.customerName }}</span>
                                            </div>

                                            <div v-if="detail.projectCode && detail.projectAddress" class="flex">
                                                <span class="font-bold text-gray-900 flex-shrink-0 w-28">หน่วยงาน
                                                    :</span>
                                                <span class="font-normal text-gray-700 break-words">{{
                                                    detail.projectCode }} {{ detail.projectAddress }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- ไม่พบข้อมูลใบส่งของ -->
                                <div v-else class="px-3 py-2 text-gray-500 text-base text-center">ไม่พบข้อมูลใบส่งของ
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="flex items-center text-base font-semibold text-gray-800 mb-3">
                            <i class="fa-solid fa-users text-gray-600 mr-2"></i>
                            ลูกค้า
                        </label>
                        <div class="relative">
                            <input type="text" v-model="formData.customerName" placeholder="ลูกค้า" class="w-full px-4 py-2 text-base bg-gray-100 border border-gray-200 rounded-xl 
                                       focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 
                                       transition-all duration-300 hover:border-gray-300" disabled>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center text-base font-semibold text-gray-800 mb-3">
                            <i class="fa-solid fa-location-crosshairs text-gray-600 mr-2"></i>
                            หน่วยงาน
                        </label>
                        <div class="relative">
                            <textarea v-model="project" rows="3" placeholder="หน่วยงาน"
                                class="w-full px-4 py-2 text-base bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 hover:border-gray-300"
                                disabled>
                            </textarea>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="flex items-center text-base font-semibold text-gray-800 mb-3">
                            <i class="fa-solid fa-truck  text-gray-600 mr-2"></i>
                            ทะเบียนรถ
                        </label>
                        <div class="relative w-full" ref="carDropdown">
                            <input type="text" v-model="formData.licence_plate"
                                @blur="formData.licence_plate = formData.tpmLicencePlate" ref="inputLicencePlate"
                                @input="getListCar" placeholder="กรุณากรอกทะเบียนรถ" class="w-full px-4 py-2 text-base bg-white border border-gray-200 rounded-xl 
                                       focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 
                                       transition-all duration-300 hover:border-gray-300">

                            <div v-if="formData.licence_plate !== '' && openListCar"
                                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-auto overflow-y-auto"
                                :style="{ top: '100%' }">
                                <!-- กรณีพบลูกค้า -->
                                <div v-if="listCar.length > 0">
                                    <div v-for="car in listCar" :key="car.id" @mousedown.prevent="selectCar(car)"
                                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">

                                        <div class="flex flex-col gap-1 text-base">
                                            <div v-if="car.licence_plate" class="flex">
                                                <span class="font-bold text-gray-900 flex-shrink-0 w-28">ทะเบียน
                                                    :</span>
                                                <span class="font-normal text-gray-700 break-words">{{ car.licence_plate
                                                    }}</span>
                                            </div>

                                            <div v-if="car.carTypeTitle" class="flex">
                                                <span class="font-bold text-gray-900 flex-shrink-0 w-28">ประเภทรถ
                                                    :</span>
                                                <span class="font-normal text-gray-700 break-words">{{
                                                    car.carTypeTitle }}</span>
                                            </div>

                                            <div v-if="car.model" class="flex">
                                                <span class="font-bold text-gray-900 flex-shrink-0 w-28">ยี่ห้อ
                                                    :</span>
                                                <span class="font-normal text-gray-700 break-words">{{
                                                    car.model }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- ไม่พบข้อมูลใบส่งของ -->
                                <div v-else class="px-3 py-2 text-gray-500 text-base text-center">ไม่พบข้อมูลใบส่งของ
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Info Card -->
                    <div :class="gradientClass" class="rounded-xl p-3 border border-blue-200">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-info-circle text-blue-600 text-base"></i>
                            </div>
                            <div>
                                <p class="text-base font-medium text-blue-900">ข้อมูลเพิ่มเติม</p>
                                <p class="text-sm text-blue-700">กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก</p>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex space-x-3 pt-4">
                        <button type="submit"
                            class="cursor-pointer flex-1 bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 
                                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2  border border-gray-200 shadow-base">
                            บันทึก
                        </button>

                        <button type="button" @click="resetForm" class="cursor-pointer px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg 
                                   hover:bg-gray-50 transition-colors duration-200 border border-gray-200 shadow-base
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
    components: { swl_modal, navbar },
    data() {
        return {
            formData: {
                doID: 0,
                doCode: "",
                tpmDoCode: "",
                carID: 0,
                licence_plate: "",
                tpmLicencePlate: "",
                employeeID: 0,
                employeeName: "",
                customerName: "",
                projectCode: "",
                projectAddress: "",
            },
            project: "",

            listDelivery: [],
            openListDelivery: false,

            listCar: [],
            openListCar: false,

            gradientClass: '',
            directions: [
                'bg-gradient-to-r', 'bg-gradient-to-l', 'bg-gradient-to-t',
                'bg-gradient-to-b', 'bg-gradient-to-tr', 'bg-gradient-to-tl',
                'bg-gradient-to-br', 'bg-gradient-to-bl'
            ]

        };
    },
    mounted() {
        this.getDataUser();
        this.generateRandomGradient()
    },
    methods: {
        getDataUser() {
            const loadingJobHash = localStorage.getItem("loadingJobHash");
            this.formData.employeeID = parseInt(loadingJobHash.split("-")[0]);

            this.formData.employeeName = localStorage.getItem("loadingJobFullname");
        },

        generateRandomGradient() {
            // Randomly select a direction
            const randomDirection = this.directions[Math.floor(Math.random() * this.directions.length)]

            // Set the gradient class with blue shades
            this.gradientClass = `${randomDirection} from-blue-100 via-white to-blue-100`
        },

        async getListDelivery() {

            if (!this.formData.doCode.trim()) {
                this.listDelivery = [];
                this.openListDelivery = false;
                return;
            }
            this.openListDelivery = true;

            try {
                const response = await axios.get(
                    "https://app.asiagroup1999.co.th/app/cst/delivery-fg?action=listDelivery&rows=3&doCode=" + this.formData.doCode
                );
                const data = response.data;
                this.listDelivery = data.rows;

            } catch (error) {
                console.error("Error :", error);
                this.listDelivery = [];
            }
        },
        selectDocode(detail) {
            this.formData.doID = detail.id;
            this.formData.doCode = detail.code;
            this.formData.tpmDoCode = detail.code;
            this.formData.customerName = detail.customerName;
            this.formData.projectCode = detail.projectCode;
            this.formData.projectAddress = detail.projectAddress;
            this.project = detail.projectCode + ' ' + detail.projectAddress;
            this.openListDelivery = false;
        },

        async getListCar() {

            if (!this.formData.licence_plate.trim()) {
                this.listCar = [];
                this.openListCar = false;
                return;
            }
            this.openListCar = true;

            try {
                const response = await axios.get(
                    "https://app.asiagroup1999.co.th/app/trs/driver-order?action=listCar&rows=3&q=" + this.formData.licence_plate
                );
                const data = response.data;
                this.listCar = data.rows;

            } catch (error) {
                console.error("Error :", error);
                this.listCar = [];
            }
        },
        selectCar(car) {
            this.formData.carID = car.id;
            this.formData.licence_plate = car.licence_plate;
            this.formData.tpmLicencePlate = car.licence_plate;
            this.openListCar = false;
        },

        resetForm() {
            this.formData.doID = 0;
            this.formData.doCode = "";
            this.formData.tpmDoCode = "";
            this.formData.customerName = "";
            this.project = "";
            this.formData.projectCode = "";
            this.formData.projectAddress = "";
            this.formData.carID = 0
            this.formData.licence_plate = "";
            this.formData.tpmLicencePlate = "";
            this.formData.employeeID = 0;
        },

        async submitForm() {
            if (!this.formData.employeeID) {
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
            } else if (!this.formData.doID) {
                this.$refs.inputDoCode.focus();
                this.$refs.swl_modal.showAlertModal({
                    swlIcon: "warning",
                    swlTitle: "ไม่พบใบส่งของ",
                    swlText: `กรุณากรอกเลขที่ใบส่งของ`,
                });
                return;
            } else if (!this.formData.licence_plate) {
                this.$refs.inputLicencePlate.focus();
                return;
            }

            try {
                const dataLoadingJob = {
                    action: "insertLoadingJob",
                    doID: this.formData.doID,
                    doCode: this.formData.doCode,
                    carID: this.formData.carID,
                    licencePlate: this.formData.licence_plate,
                    employeeID: this.formData.employeeID,
                };

                const submitResponse = await axios.post("https://app.asiagroup1999.co.th/app/cst/loadingJob", dataLoadingJob);
                if (submitResponse.data.success == true) {
                    this.$refs.swl_modal.showAlertModal({
                        swlIcon: "success",
                        swlTitle: "บันทึกสำเร็จ",
                        swlText: `บันทึกใบส่งของเรียบร้อยแล้ว`,
                    });
                    this.resetForm();
                } else {
                    this.$refs.swl_modal.showAlertModal({
                        swlIcon: "error",
                        swlTitle: "บันทึกไม่สำเร็จ",
                        swlText: `เกิดข้อผิดพลาดในการบันทึก`,
                    });
                    console.error("การบันทึกไม่สำเร็จ:", submitResponse);
                }
            } catch (error) {
                this.$refs.swl_modal.showAlertModal({
                    swlIcon: "error",
                    swlTitle: "เกิดข้อผิดพลาด",
                    swlText: `ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้`,
                });
                console.error("เกิดข้อผิดพลาดในการบันทึก:", error);
            }

        }

    }
};
</script>