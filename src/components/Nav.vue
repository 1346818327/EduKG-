<template>
    <div class="nav">
        <div class="imgbox">
            <img src="../assets/img/icofont.png" alt=""
                style="object-fit: contain; height: 64px;float: left;margin-left: 70px;">
        </div>
        <div class="user">
            <div class="user_head">

            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.user_head {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: white;
}

.user {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 72px;
    margin-right: 70px;
}

.nav {
    height: 72px;
    width: 100%;
    background-color: rgb(94, 89, 232);
}
</style>