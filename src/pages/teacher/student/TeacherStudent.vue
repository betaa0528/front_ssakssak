<template>
    <div class="container">
        <div class="row mt-5">
            <!-- 학생 목록 카드 -->
            <div class="col-8" style="overflow-y: hidden;">
                <div class="card student-card px-3 shadow-sm" style="height: 100%; border-radius: 12px;">
                    <div class="d-flex mt-4 ms-2">
                        <span class="h4">학생 목록</span>
                    </div>
                    <div class="mt-3" style="height: 100%">
                        <div class="row table-header m-0 mb-2 pe-3" style="border-radius: 12px;">
                            <div class="col-1 text-center">
                                <span class="fs-6">번호</span>
                            </div>
                            <div class="col-2 text-center">
                                <span class="fs-6">이름</span>
                            </div>
                            <div class="col-3 text-center">
                                <span class="fs-6">직업</span>
                            </div>
                            <div class="col-3 text-center">
                                <span class="fs-6">보유 씨드</span>
                            </div>
                            <div class="col-3 text-center">
                                <span class="fs-6">수정 / 이별</span>
                            </div>
                        </div>
                        <div class="std-list-wrap">
                            <div v-for="student in students" :key="student.id" class="row text-center table-row py-2 m-0"
                                style="border-radius: 12px;">
                                <div class="col-1">
                                    <span class="fs-6 text-dark">{{ student.stdNum }}</span>
                                </div>
                                <div class="col-2">
                                    <span class="fs-6 text-dark">{{ student.stdName }}</span>
                                </div>
                                <div class="col-3">
                                    <span class="fs-6 text-dark">{{ getJobName(student.jobId) }}</span>
                                </div>
                                <div class="col-3">
                                    <span class="fs-6 text-dark">{{ student.seed }}</span>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-sm btn-outline-primary me-2"
                                        @click="studentModifyModal(student)">수정</button>
                                    <button class="btn btn-sm btn-outline-danger"
                                        @click="deleteStudent(student.stdId)">이별</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 새 친구 등록 카드 -->
            <div class="col-4 shadow-sm">
                <div class="card new-student-card" style="height: 100%; border-radius: 12px;">
                  <div class="p-4">
                    <h4 class="mb-4"></h4>
                    <form @submit.prevent="addStudent"
                          :class="addStudentFormStatus ? 'needs-validation' : 'needs-validation was-validated'"
                          novalidate>
                      <div class="mb-3 mt-2">
                        <label for="sno" class="form-label text-dark">번호</label>
                        <input type="text" id="sno" class="form-control" v-model="newStudent.stdNum"
                               required>
                      </div>
                      <div class="mb-3">
                        <label for="name" class="form-label text-dark">이름</label>
                        <input type="text" id="name" class="form-control" v-model="newStudent.stdName" required>
                      </div>
                      <div class="mb-3">
                        <label for="birthday" class="form-label text-dark">생일</label>
                        <input type="date" id="birthday" class="form-control" v-model="newStudent.stdBirth" required>
                      </div>
                      <div class="mb-3">
                        <label for="jobs" class="form-label text-dark">직업</label>
                        <select class="form-select" id="jobs" v-model="newStudent.jobId" required>
                          <option value="">선택하세요</option>
                          <option v-for="job in jobs" :key="job.jobId" :value="job.jobId">{{ job.jobName }}</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="seed" class="form-label text-dark">씨드</label>
                        <input type="text" id="seed" class="form-control" v-model="newStudent.seed" required>
                      </div>
                      <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary w-100">등록</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
        </div>

        <!-- 직업 목록 및 새 직업 등록 -->
        <div class="row mt-5 align-items-stretch">
            <!-- 직업 목록 카드 -->
            <div class="col-8" style="overflow-y: hidden;">
                <div class="card job-list-card px-3 shadow-sm" style="height: 100%; border-radius: 12px;">
                    <div class="d-flex mt-4 ms-2">
                        <span class="h4 text-dark">직업 목록</span>
                    </div>
                    <div class="mt-2 text-center" style="height: 100%">
                        <div class="row table-header m-0 mb-2 pe-4">
                            <div class="col-3 text-center">
                                <span class="fs-6">직업명</span>
                            </div>
                            <div class="col-6 text-center">
                                <span class="fs-6">상세설명</span>
                            </div>
                            <div class="col-3 text-center">
                                <span class="fs-6">수정 / 삭제</span>
                            </div>
                        </div>
                        <div class="job-list-wrap pb-4" style="overflow-y: scroll; max-height: 300px;">
                            <div v-for="job in jobs" :key="job.jobId" class="row text-center py-2 m-0"
                                style="border-radius: 12px;">
                                <div class="col-3">
                                    <span class="fs-6 text-dark">{{ job.jobName }}</span>
                                </div>
                                <div class="col-6">
                                    <span class="fs-6 text-dark">{{ job.jobContent }}</span>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-sm btn-outline-primary me-2" @click="studentJobModifyModal(job.jobId)">수정</button>
                                    <button class="btn btn-sm btn-outline-danger" type="button"
                                        @click="deleteStudentJob(job.jobId)">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 새 직업 등록 카드 -->
            <div class="col-4 shadow-sm">
                <div class="card new-job-card" style="height: 100%; border-radius: 12px;">
                  <div class="p-4">
                    <h4 class="mb-4 text-dark">새 직업 등록</h4>
                    <form @submit.prevent="addJob"
                    :class="addJobFormStatus ? 'needs-validation' : 'needs-validation was-validated'"
                    style="height:100%" novalidate>
                  <div class="mb-3">
                      <label for="job-name" class="form-label text-dark">직업명</label>
                      <input type="text" id="job-name" class="form-control" v-model="newJob.jobName" required>
                  </div>
                  <div class="mb-3">
                      <label for="job-description" class="form-label text-dark">상세설명</label>
                      <input type="text" id="job-description" class="form-control" v-model="newJob.jobContent" required>
                  </div>
                  <div class="mb-3">
                      <label for="job-isPrime" class="form-label text-dark">추가씨드 여부</label>
                      <select id="job-isPrime" class="form-select" v-model="newJob.isPrime" required>
                        <option value="">선택하세요</option>
                        <option value="Y">Yes (Y)</option>
                        <option value="N">No (N)</option>
                    </select>
                  </div>
                  <div class="d-flex justify-content-end">
                      <button type="submit" class="btn btn-primary w-100">등록</button>
                  </div>
              </form>
                </div>
              </div>
            </div>
        </div>
    </div>


    <StudentModify v-if="studentModifyModalShow" @close="studentModifyModal" :student="selectedStudent" :jobs="jobs" />
    <StudentJobModify v-if="studentJobModifyModalShow" @close="closeStudentJobModifyModal" :job="studentJobData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StudentModify from '@/components/layouts/teacher/student/StudentModify.vue';
import StudentJobModify from '@/components/layouts/teacher/student/StudentJobModify.vue';
import apiService from '@/api/teacherClassApi'; // API 파일 import
import { useCounterStore } from '@/stores/couter';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
console.log(auth.roles);
// Pinia store 사용
const store = useCounterStore();

// 모달 상태 관리
const studentModifyModalShow = ref(false);
const studentJobModifyModalShow = ref(false);

// 학생 데이터 관리
const students = ref([]);
const studentData = ref('');
const studentJobData = ref('');
const jobs = ref([...store.jobs]);
const selectedStudent = ref(null); 

// 학생 데이터 가져오는 함수
const fetchStudents = async () => {
    try {
        const data = await apiService.getStudent(); // API 호출
        console.log('학생 데이터:', data); // API 응답 데이터 확인
        students.value = data; // students에 할당
    } catch (error) {
        console.error('학생 데이터를 불러오는데 실패했습니다:', error);
    }
};
const fetchjobs = async () => {
    try {
        const data = await apiService.getJobList(); // API 호출
        console.log('직업 데이터:', data); // API 응답 데이터 구조 확인
        jobs.value = data; // jobs에 할당
    } catch (error) {
        console.error('직업 데이터를 불러오는데 실패했습니다:', error);
    }
};

const getJobName = (jobId) => {
    // jobs 배열에서 student의 jobId와 매칭되는 직업을 찾음
    const job = jobs.value.find(job => job.jobId === jobId);
    // 매칭된 직업이 있으면 job.jobName 반환, 없으면 '무직' 반환
    return job ? job.jobName : '무직';
};

const deleteStudentJob = (id) => {
    // students 배열에서 해당 id를 가진 학생을 찾아서 삭제
    const index = jobs.value.findIndex(job => job.jobId === id);
    if (index !== -1) {
        jobs.value.splice(index, 1);  // 배열에서 해당 학생 삭제
        console.log(`직업 ${id}가 삭제되었습니다.`);
    } else {
        console.error(`직업을 ${id}를 찾을 수 없습니다.`);
    }
};


const deleteStudent = (id) => {
    // students 배열에서 해당 id를 가진 학생을 찾아서 삭제
    const index = students.value.findIndex(student => student.stdId === id);
    if (index !== -1) {
        students.value.splice(index, 1);  // 배열에서 해당 학생 삭제
        console.log(`학생 ID ${id}가 삭제되었습니다.`);
    } else {
        console.error(`학생 ID ${id}를 찾을 수 없습니다.`);
    }
};

// 학생 수정 모달
const studentModifyModal  = (student) => {
    selectedStudent.value = student;
    studentModifyModalShow.value = !studentModifyModalShow.value;
};


// 모달 열기
const studentJobModifyModal = (jobId) => {
    const job = jobs.value.find((job) => job.jobId === jobId);
    if (job) {
        studentJobData.value = job; // 찾은 직업 데이터를 할당
        studentJobModifyModalShow.value = true; // 모달창 열기
    } else {
        console.error(`직업 ID ${jobId}를 찾을 수 없습니다.`);
    }
};
// 모달 닫기
const closeStudentJobModifyModal = () => {
    studentJobModifyModalShow.value = false; // 모달 닫기
};

// 새 친구 등록을 위한 폼 상태와 데이터 관리
const newStudent = ref({
  stdNum: '',
  stdName: '',
  stdBirth: '',
  jobId: '',
  seed: ''
});

const addStudentFormStatus = ref(true);

// 학생 등록 API 호출
const addStudent = async () => {
  if (!newStudent.value.stdNum || !newStudent.value.stdName || !newStudent.value.stdBirth || !newStudent.value.jobId || !newStudent.value.seed) {
    addStudentFormStatus.value = false; // 유효성 검사 실패 시 처리
    return;
  }

  try {
    // 학생 등록 API 호출
    const response = await apiService.registStudent(newStudent.value);
    console.log('학생 등록 성공:', response);
    
    // 등록 후 폼 초기화
    newStudent.value.stdNum = '';
    newStudent.value.stdName = '';
    newStudent.value.stdBirth = '';
    newStudent.value.jobId = '';
    newStudent.value.seed = '';
  } catch (error) {
    console.error('학생 등록 실패:', error);
  }
};

// 직업 등록 상태 관리 변수
const addJobFormStatus = ref(true);

const newJob = ref({
    jobName: '',        // 직업명 필드
    jobContent: '',     // 직업 설명 필드
    isPrime: ''         // 우대금리 필드
});

const addJob = async () => {
    try {
        // 서버에 POST 요청을 통해 직업 데이터 전송
        const response = await apiService.registJob(newJob.value);
        console.log('직업 추가 성공:', response.data);

        // 직업 목록을 다시 불러와 갱신
        await fetchjobs();

        // 성공 시 폼을 초기화
        newJob.value.jobName = '';
        newJob.value.jobContent = '';
        newJob.value.isPrime = '';
        
        addJobFormStatus.value = true;
    } catch (error) {
        console.error('직업 추가 실패:', error);
        addJobFormStatus.value = false;
    }
};



// 페이지가 로드될 때 학생 데이터를 불러옴
onMounted(() => {
    fetchStudents();
    fetchjobs();
});
</script>

<style scoped>

/* 공통 스타일 */
/* 학생 목록 카드 배경 이미지 */
.student-card {

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* 새 친구 등록 카드 배경 이미지 */
.new-student-card {
    background-image: url('@/assets/images/studentlist.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* 직업 목록 카드 배경 이미지 */
.job-list-card {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* 새 직업 등록 카드 배경 이미지 */
.new-job-card {
    background-image: url('@/assets/images/jobadd.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color:#767D8B;
}

.table-header {
    background-color: #f8f9fa;
    font-weight: bold;
    padding: 10px 0;
    border-radius: 12px;
}

.table-row {
    border-bottom: 1px solid #e9ecef;
    background-color: #fdfdfd;
    transition: background-color 0.2s ease;
}

.table-row:hover {
    background-color: #f1f3f5;
}

.std-list-wrap {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 5px;
}

.std-list-wrap::-webkit-scrollbar {
    width: 8px;
}

.std-list-wrap::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.btn-outline-primary {
    border-color: #00a3ff;
    color: #00a3ff;
    transition: background-color 0.2s ease;
}

.btn-primary {
    background-color: #00a3ff;
    color: white;
}

.btn-outline-primary:hover {
    background-color: #00a3ff;
    color: white;
}

.btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;
    transition: background-color 0.2s ease;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
}

/* 반응형 조정 */
@media (max-width: 768px) {
    .col-8, .col-4 {
        width: 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }
}

</style>

