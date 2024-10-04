import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        students: [
            { id: '1', name: '김철수', job: '5', seed: 1471, birthday: '2015-10-11' },
            { id: '2', name: '이영희', job: '2', seed: 2307, birthday: '2015-06-27' },
            { id: '3', name: '박민수', job: '7', seed: 1865, birthday: '2015-05-23' },
            { id: '4', name: '최정훈', job: '4', seed: 4634, birthday: '2015-08-23' },
            { id: '5', name: '정예진', job: '3', seed: 396, birthday: '2015-01-16' },
            { id: '6', name: '강현우', job: '6', seed: 4852, birthday: '2015-07-16' },
            { id: '7', name: '송하나', job: '1', seed: 560, birthday: '2015-07-06' },
            { id: '8', name: '문태수', job: '1', seed: 1322, birthday: '2015-03-06' },
            { id: '9', name: '임유리', job: '1', seed: 184, birthday: '2015-04-04' },
            { id: '10', name: '최동혁', job: '1', seed: 969, birthday: '2015-11-04' },
            { id: '11', name: '이준호', job: '1', seed: 391, birthday: '2015-03-15' },
            { id: '12', name: '김서영', job: '1', seed: 905, birthday: '2015-08-22' },
            { id: '13', name: '박지훈', job: '1', seed: 366, birthday: '2015-10-07' },
            { id: '14', name: '윤서현', job: '1', seed: 430, birthday: '2015-12-11' },
            { id: '15', name: '한지민', job: '1', seed: 702, birthday: '2015-02-21' },
            { id: '16', name: '이상혁', job: '1', seed: 564, birthday: '2015-05-03' },
            { id: '17', name: '김나연', job: '1', seed: 161, birthday: '2015-12-11' },
            { id: '18', name: '홍길동', job: '1', seed: 230, birthday: '2015-10-26' },
            { id: '19', name: '배수진', job: '1', seed: 374, birthday: '2015-01-26' },
            { id: '20', name: '조민준', job: '1', seed: 366, birthday: '2015-04-15' }
        ],
        jobs: [
            {
                jno: '1',
                name: '회사원',
                description: '회사에서 다양한 업무를 수행하는 직업입니다.'
            },
            {
                jno: '2',
                name: '경찰',
                description: '시민의 안전을 보호하고 법을 집행하는 직업입니다.'
            },
            {
                jno: '3',
                name: '환경미화원',
                description: '도시의 청결과 위생을 책임지는 직업입니다.'
            },
            {
                jno: '4',
                name: '우체부',
                description: '편지와 소포를 배달하는 직업입니다.'
            },
            {
                jno: '5',
                name: '낙농협회장',
                description: '낙농업을 대표하며, 협회 운영을 총괄하는 직업입니다.'
            },
            {
                jno: '6',
                name: '한국전력공사대표',
                description: '전력 공급을 관리하고 운영하는 공기업의 대표입니다.'
            },
            {
                jno: '7',
                name: '사서',
                description: '도서관에서 책과 자료를 관리하는 직업입니다.'
            },
            {
                jno: '8',
                name: '통계청장',
                description: '국가의 다양한 통계 데이터를 관리하고 분석하는 직업입니다.'
            },
            {
                jno: '9',
                name: '통계청장',
                description: '국가의 다양한 통계 데이터를 관리하고 분석하는 직업입니다.'
            }
        ]

    }),
    getters: {
        getStudents(state) {
            return state.students;
        },
        getJobsLastJno(state) {
            return this.jobs[this.jobs.length-1].jno;
        }
    },
    actions: {
        studentModify(data) {
            const index = this.students.findIndex(student => student.id === data.id);
            if (index !== -1) {
                this.students[index] = { ...data };
            }

        },
        deleteStudent(id) {
            this.students = this.students.filter(student => student.id !== id);
        },
        studentJobModify(data) {
            const index = this.jobs.findIndex(job => job.jno === data.jno);
            if (index !== -1) {
                this.jobs[index] = { ...data };
            }
        },
        deleteStudentJob(jno) {
            this.jobs = this.jobs.filter(job => job.jno !== jno);
        }
    }
})