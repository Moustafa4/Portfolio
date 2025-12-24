import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe {
  ngAfterViewInit() {
    // const svg = document.getElementsByTagName('svg');
    const divcon = document.querySelectorAll('.skills_con .svg_con');
    let section = document.querySelector('.skills_row') as HTMLElement;
    let startedanimation = false;

    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      if (!startedanimation && rect.top <= window.innerHeight - 100) {
        startedanimation = true;
        divcon.forEach((div) => started(div));
        console.log('Animation started');
      }
    });

    function started(el: any) {
      let goal = +el.dataset.goal;
      let circle = el.getElementsByTagName('circle')[0];
      let rad = circle.r.baseVal.value;
      let par = Number(2 * Math.PI * rad);
      circle.style.strokeDasharray = `${par}`;
      circle.style.strokeDashoffset = `${par}`;
      let currentval = par;
      let targetval = par * (1 - goal / 100);
      let step = (par - targetval) / 60;
      // console.log(currentval);
      // console.log(targetval);
      const anim = setInterval(() => {
        currentval -= step;

        if (currentval <= targetval) {
          circle.style.strokeDashoffset = `${targetval}`;
          clearInterval(anim);
        }
        circle.style.strokeDashoffset = `${currentval}`;
      }, 3000 / goal);
    }
  }
}
