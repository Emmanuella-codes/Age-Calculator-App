<script setup>
import { ref } from 'vue';

const generateArr = (start, end) => {
  let arr = [];
  for (start; start <= end; start++) {
    arr.push(start);
  }
  return arr;
};

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const days = generateArr(1, 31);
const years = generateArr(1900, new Date().getFullYear());

const fields = [
  {
    name: 'day',
    label: 'DAY',
    type: 'number',
    value: '',
    placeholder: 'DD',
    options: days,
  },
  {
    name: 'month',
    label: 'MONTH',
    type: 'number',
    value: '',
    placeholder: 'MM',
    options: months,
  },
  {
    name: 'year',
    label: 'YEAR',
    type: 'number',
    value: '',
    placeholder: 'YYYY',
    options: years,
  },
];

const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);
const age = ref('');
console.log(selectedDay);

const calculateAge = () => {
  const day = parseInt(fields[0].value);
  const month = parseInt(fields[1].value);
  const year = parseInt(fields[2].value);
  const birthday = `${month} ${day} ${year}`;

  let today = new Date(),
    dob = new Date(birthday),
    diff = today.getTime() - dob.getTime(),
    years = Math.floor(diff / (1000 * 24 * 60 * 60 * 365.24)), // 1000*24*60*60*365.24 = calculate millisecond in a year
    daysDiff = Math.floor((diff % (1000 * 24 * 60 * 60 * 365.24)) / 86400000), // 86400000 = millisecond in a day
    months = Math.floor(daysDiff / 30.4167), // 30.4167 = days in a month
    days = Math.floor(daysDiff % 30.4167);

  console.log(`${years} years, ${months} month(s), ${years} years.`);

  age.value = {
    years,
    months,
    days,
  };
};
</script>

<template>
  <div class="card flex flex-col justify-center align-center">
    <!--Input section-->
    <div id="input-field">
      <form @submit.prevent="calculateAge">
        <div class="flex -mx-3 mb-6">
          <div
            v-for="field in fields"
            :key="field.name"
            class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
          >
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs mb-2"
              for="grid-first-name"
              :for="field.name"
            >
              {{ field.label }}
            </label>
            <select
              class="
                appearance-none
                block
                w-full
                rounded
                py-3
                px-4
                mb-3
                max-md:px-2
                leading-tight
                focus:outline-none focus:bg-white
                font-bold
              "
              id="grid-first-name"
              :id="field.name"
              :placeholder="field.placeholder"
              v-model="field.value"
            >
              <option v-for="item in field.options" :value="item" :key="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <button class="cta flex" type="submit">
          <span>Check</span>
          <svg class="mt-2" viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </form>
    </div>
    <!--Result section-->
    <div class="result flex mb-6 align-center">
      <div v-if="age">
        <!-- <h4>You {{ currentMonth > birthMonth ? 'will be' : 'are' }}</h4> -->
        <h2>
          <span>{{ age.years }}</span
          >years
        </h2>
        <h2>
          <span>{{ age.months }}</span
          >months
        </h2>
        <h2>
          <span>{{ age.days }}</span
          >day(s)
        </h2>
      </div>
      <div v-else>
        <h2><span>- - </span>years</h2>
        <h2><span>- - </span>months</h2>
        <h2><span>- - </span>day(s)</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cta {
  position: relative;
  margin: auto;
  padding: 12px 18px;
  transition: all 0.2s ease;
  border: none;
  background: none;
}

.cta:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 50px;
  background: hsl(259, 100%, 65%);
  width: 45px;
  height: 45px;
  transition: all 0.3s ease;
}

.cta span {
  position: relative;
  font-family: 'Ubuntu', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #234567;
}

.cta svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #234567;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.cta:hover:before {
  width: 100%;
  background: hsl(284.64deg 100% 65%);
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active {
  transform: scale(0.95);
}
</style>
