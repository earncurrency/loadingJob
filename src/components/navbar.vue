<template>
    <nav class="bg-white shadow-md border-b border-gray-300">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="#" class="font-bold text-xl text-gray-800">
                        <img class="w-auto h-10 object-cover" :src="`${imageIcon}asiaGray.png`" alt="Logo" />
                    </a>
                </div>

                <div class="hidden md:block relative" ref="dropdown">
                    <div @click="toggleDropdown"
                        class="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition duration-200">
                        <i class="fa-regular fa-user text-xl"></i>
                        <span class="text-gray-700 font-medium">{{ user.employeeName || "ชื่อผู้ใช้งาน" }}</span>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <div v-show="isDropdownOpen"
                        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-md z-20 border border-gray-300">
                        <RouterLink to="/"
                            class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 duration-200">
                            <i class="fas fa-file-invoice mr-2"></i>เเบบฟอร์มบันทึก
                        </RouterLink>
                        <RouterLink to="/history"
                            class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 duration-200">
                            <i class="fa-solid fa-clock-rotate-left mr-2"></i>ประวัติการขึ้นสินค้า
                        </RouterLink>
                        <button @click="logout"
                            class="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 duration-200">
                            <i class="fa-solid fa-right-from-bracket mr-2"></i>ออกจากระบบ
                        </button>
                    </div>
                </div>

                <div class="md:hidden">
                    <button @click="toggleMobileMenu"
                        class="items-center flex mobile-menu-button focus:outline-none focus:bg-gray-200 p-2 rounded-md">
                        <i class="fa-solid fa-bars text-xl text-gray-700"></i>
                    </button>
                </div>
            </div>
        </div>

        <div v-show="isMobileMenuOpen"
            class="mobile-menu absolute w-full md:hidden bg-white shadow-md border-t border-gray-300"
            ref="mobileMenu">
            <div class="flex items-center space-x-2 p-4 text-sm border-b border-gray-300">
                <i class="fa-regular fa-user text-sm"></i>
                <span class="text-gray-700 font-medium">{{ user.employeeName || "ชื่อผู้ใช้งาน" }}</span>
            </div>
            <RouterLink to="/"
                class="block w-full text-left px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 duration-200">
                <i class="fas fa-file-invoice mr-2"></i>เเบบฟอร์มบันทึก
            </RouterLink>
            <RouterLink to="/history"
                class="block w-full text-left px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 duration-200">
                 <i class="fa-solid fa-clock-rotate-left mr-2"></i>ประวัติการขึ้นสินค้า
            </RouterLink>
            <button @click="logout"
                class="block w-full text-left px-4 py-4 text-sm text-red-700 hover:bg-gray-100 duration-200">
                <i class="fa-solid fa-right-from-bracket mr-2"></i>ออกจากระบบ
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            imageIcon: __IMG_ICON__,
            isDropdownOpen: false,
            isMobileMenuOpen: false,
            user: {
                code: "",
                employeeName: "",
            }
        };
    },
    mounted() {
        this.getDataUser();
        document.addEventListener('click', this.closeMenu);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeMenu);
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
            this.isMobileMenuOpen = false;
        },
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            this.isDropdownOpen = false;
        },
        closeMenu(event) {
            const dropdownRef = this.$refs.dropdown;
            const mobileMenuRef = this.$refs.mobileMenu;
            const isDropdownClick = dropdownRef && dropdownRef.contains(event.target);
            const isMobileMenuClick = mobileMenuRef && mobileMenuRef.contains(event.target);
            const isMobileButton = this.$el.querySelector('.mobile-menu-button') && this.$el.querySelector('.mobile-menu-button').contains(event.target);

            // ปิดเมนูเมื่อคลิกนอกพื้นที่ของทั้งสองเมนูและปุ่ม Hamburger
            if (!isDropdownClick && !isMobileMenuClick && !isMobileButton) {
                this.isDropdownOpen = false;
                this.isMobileMenuOpen = false;
            }
        },
        getDataUser() {
            const storedHash = localStorage.getItem("loadingJobHash");
            this.user.employeeName = localStorage.getItem("loadingJobFullname");
            if (storedHash) {
                this.user.code = storedHash.split("-")[0];
            }
        },
        logout() {
            localStorage.removeItem("loadingJobHash");
            localStorage.removeItem("loadingJobFullname");
            this.$router.push("/login");
        }
    },
};
</script>

<style scoped>
/* CSS เพิ่มเติมหากต้องการ */
</style>
