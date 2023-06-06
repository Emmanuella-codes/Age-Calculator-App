<script setup>
import { ref } from 'vue';

const fields = [
  { name: 'day', label: 'DAY', type: 'number', value: '', placeholder: 'DD' },
  {
    name: 'month',
    label: 'MONTH',
    type: 'number',
    value: '',
    placeholder: 'MM',
  },
  {
    name: 'year',
    label: 'YEAR',
    type: 'number',
    value: '',
    placeholder: 'YYYY',
  },
];

const ageInYears = ref(null);
const ageInMonths = ref(null);
const ageInDays = ref(null);
const errorMessage = ref('');

const calculateAge = () => {
  const birthDay = parseInt(fields[0].value);
  const birthMonth = parseInt(fields[1].value);
  const birthYear = parseInt(fields[2].value);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  if (!birthDay || !birthMonth || !birthYear) {
    errorMessage.value = 'Please enter a valid date.';
    return;
  }

  if (birthDay < 1 || birthDay > 31 || birthMonth < 1 || birthMonth > 12) {
    errorMessage.value = 'Please enter a valid day and month.';
    return;
  }

  if (
    birthYear > currentYear ||
    (birthYear === currentYear && birthMonth > currentMonth) ||
    (birthYear === currentYear &&
      birthMonth === currentMonth &&
      birthDay > currentDay)
  ) {
    errorMessage.value = 'Please enter a valid date in the past.';
    return;
  }

  const ageInMilliseconds =
    currentDate - new Date(birthYear, birthMonth - 1, birthDay);
  const ageInDaysValue = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const ageInYearsValue = Math.floor(ageInDaysValue / 365);
  const ageInMonthsValue = Math.floor((ageInDaysValue % 365) / 30);

  animateNumber(ageInYears, ageInYearsValue);
  animateNumber(ageInMonths, ageInMonthsValue);
  animateNumber(ageInDays, ageInDaysValue);

  errorMessage.value = '';
};

const animateNumber = (refValue, targetValue) => {
  if (refValue.value === null) {
    refValue.value = targetValue;
    return;
  }

  const currentValue = refValue.value;
  const increment = targetValue > currentValue ? 1 : -1;

  const interval = setInterval(() => {
    refValue.value += increment;

    if (
      (increment > 0 && refValue.value >= targetValue) ||
      (increment < 0 && refValue.value <= targetValue)
    ) {
      clearInterval(interval);
      refValue.value = targetValue;
    }
  }, 20);
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
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-first-name"
              :for="field.name"
            >
              {{ field.label }}
            </label>
            <input
              class="
                appearance-none
                block
                w-full
                rounded
                py-3
                px-4
                mb-3
                leading-tight
                focus:outline-none focus:bg-white
              "
              id="grid-first-name"
              :type="field.type"
              :id="field.name"
              :placeholder="field.placeholder"
              v-model="field.value"
            />
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
      <div v-if="errorMessage !== ''">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-else-if="ageInYears !== null">
        <h4>You {{ currentMonth > birthMonth ? 'will be' : 'are' }}</h4>
        <h2>
          <span>{{ ageInYears }}</span
          >years
        </h2>
        <h2>
          <span>{{ ageInMonths }}</span
          >months
        </h2>
        <h2>
          <span>{{ ageInDays }}</span
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
