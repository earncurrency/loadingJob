<template>
    <navbar />
    <div class=" py-8 px-4 mt-6" style="min-height: calc(100vh);">
        <div class="max-w-lg mx-auto">

            <!-- Header Card -->
            <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6">
                <div class="bg-white px-6 py-8 text-center">
                    <div
                        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-sm">
                        <i class="fa-solid fa-clock-rotate-left text-gray-600 text-2xl"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">ประวัติการขึ้นสินค้า</h2>
                    <p v-if="employeeName" class="text-gray-900 text-sm">{{ employeeName }}</p>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
                <div class="space-y-6">

                    <div>
                        <h3 class="text-md font-bold text-gray-800 mb-4">10 รายการล่าสุด</h3>
                        <ul v-if="listLoadingJob" class="space-y-4">
                            <li v-for="item in listLoadingJob" :key="item.id"
                                class="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div class="items-center">
                                    <p class="text-sm font-bold text-gray-900">วันที่ : <span
                                            class="text-gray-700 font-normal">{{ item.create_at }}</span></p>
                                    <div class="flex justify-between ">
                                        <p class="text-sm font-bold text-gray-900 mt-1">เลขที่ : <span
                                                class="text-gray-700 font-normal">{{ item.doCode }}</span></p>
                                        <p class="text-sm font-bold text-gray-900 mt-1">ทะเบียน : <span
                                                class="text-gray-700 font-normal">{{ item.licencePlate }}</span></p>
                                    </div>
                                    <!-- <div class="text-right">
                                        <p class="text-sm text-gray-400">เลขที่</p>
                                        <p class="font-bold text-blue-600">{{ item.number }}</p>
                                    </div> -->
                                </div>
                            </li>
                        </ul>
                        <div v-else class="text-center text-gray-500 py-8">
                            <p>ไม่พบข้อมูล</p>
                        </div>
                    </div>
                </div>
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
</template>
<script>
import navbar from "@/components/navbar.vue"
import axios from "axios";

export default {
    components: { navbar },
    data() {
        return {
            employeeID: 0,
            employeeName:"",
            listLoadingJob: [],
        }
    },
    computed: {},
    mounted() {
        this.getDataUser();
        this.getListLoadingJob();
    },
    methods: {
        getDataUser() {
            const loadingJobHash = localStorage.getItem("loadingJobHash");
            this.employeeID = loadingJobHash.split("-")[0];
            this.employeeName = localStorage.getItem("loadingJobFullname");
        },
        async getListLoadingJob() {
            await axios.get("https://app.asiagroup1999.co.th/app/cst/loadingJob/?action=listLoadingJob&rows=10&employeeID=" + this.employeeID)
                .then((response) => {
                    const data = response.data;
                    this.listLoadingJob = data.rows;

                    console.log("listLoadingJob by employee id :", this.listLoadingJob)
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการเเสดงข้อมูล :", error);
                });
        }
    },


}
</script>