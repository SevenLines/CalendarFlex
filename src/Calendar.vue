<template>
  <div class="year">
    <div class="month" v-for="month in yearData">
      <div class="title">{{month.title}}</div>
      <div class="week">
        <div class="day" v-for="d in weekDays">
          <span>{{d}}</span>
        </div>
      </div>
      <div class="week" v-for="week in month.weeks">
        <div class="day" v-for="day in 7" :class="{[`week-day-${day}`]: true}">
          <span v-if="week[day]">{{week[day].date.getDate()}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    margin: 0.25em;
    font-weight: bold;
  }

  .week-day-7 {
    color: red;
  }

  .week {
    display: flex;
  }

  .day {
    margin: 0.25em;
    flex-grow: 1;
    flex-basis: 2em;
  }

  .year {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .month {
    margin: 0.25em;
    flex-grow: 1;
  }
</style>

<script>
  import moment from 'moment'

  require('moment/locale/ru.js');

  export default {
    props: {
      year: {  // год на который строится календарь
        type: Number,
        default: (new Date()).getFullYear()
      },
    },
    data() {
      return {}
    },
    computed: {
      weekDays () {
        let days = [];
        for(let i = 1; i<=7;++i) {
          days.push(moment().isoWeekday(i).format("dd"))
        }
        return days;
      },
      yearData() {
        let data = [];
        for (let m = 0; m < 12; ++m) {
          let day = moment({year: this.year, month: m, day: 1}); // формируем дату на первый день каждого месяца
          let daysInMonth = day.daysInMonth(); // количество дней в месяце
          let month = { // готовим объект месяца
            title: day.format("MMMM"),
            weeks: {},
          };

          // итерируем по количеству дней в месяце
          for (let d = 0; d < daysInMonth; ++d) {
            let week = day.week();
            // небольшой хак, момент считает
            // последние дни декабря за первую неделю,
            // но мне надо чтобы считалось за 53
            if (m === 11 && week === 1) {
              week = 53
            }
            // если неделя еще не присутствует в месяце, то добавляем ее
            if (!month.weeks.hasOwnProperty(week)) {
              month.weeks[week] = {}
            }
            // добавляем день, у weekday() нумерация с нуля,
            // поэтому добавляю единицу, можно и не добавлять,
            // но так будет удобнее
            month.weeks[week][day.weekday() + 1] = {
              date: day.toDate(),
            };

            // итерируем день на единицу, moment мутирует исходное значение
            day.add(1, 'd');
          }

          // добавлям данные по месяцу в год
          data.push(month);
        }
        return data
      }
    }
  }
</script>
