export const html = `
<html lang='en' class='touch-none select-none'>

<head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width' />
    <title>I want something!</title>

    <style>
        .touch-none {
            touch-action: none;
        }

        .select-none {
              -webkit-touch-callout: none;
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
        }

        .absolute {
            position: absolute;
        }

        .w-full {
            width: 100%;
        }

        .h-full {
            height: 100%;
        }

        .container {
            width: 100%;
            height: 100%;
            background-color: lightyellow;
        }

        #status {
            display: flex;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .bg-red-300 {
            background-color: #b04f9a;
        }

        .left-0 {
            left: 0;
        }

        .right-half {
            right: 50%;
        }

        .right-0 {
            right: 0;
        }

        .left-half {
            left: 50%;
        }

        .bg-green-300 {
            background-color: #4fb065;
        }

        .capture {
            display: flex;
            flex-direction: column;
            justify-content: end;
        }

        .instruction-text {
            color: #292929;
            font-size: 4rem;
            padding-bottom: 3rem;
            text-align: center;

        }

        .sprite {
            image-rendering: pixelated;
            position: absolute;
            left: calc(50% - min(200px, 96vw / 2));
            width: min(400px, calc(96vw));
            background-size: cover;
            z-index: 5;
            aspect-ratio: 1;
        }

        .sprite-0 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAEbElEQVR4Xu1dMW4UQRDcCwgcIZEgEoRIkD8AQnLKH3BMwBd4Al8gIDZ/ILWEzAcsEssiQSRIRA4I4NAu4/Lt9m319szN+KiLzueenr2q6eqe2Zm9VadXVQRWVXtX550IqDwIRIAIqIxA5e4VASKAQ+D3+sVZjq1W69fStqXbNXthm19cBJQeCjP+RUAFAhD0iIqgerUmR01LkAioMOqxSxGwkACvXqMsWKD/PHy+8Gq67u75p9TWkqPINS++sHXDIhIU+TIiIELn0FYE8CBmi4CIXm/IQrr6iOxYEGyRIx61tWWuykoEDLB7y1wR4Bqv18Z7FQG5EiaC8rJ7ktB6d3gvvf98+X0h5F339NH91Pb1+Y/0/kP3ZbHcMZUVc8EhCRIBPcQRORIBwzD1JvxqERAZ9YyMvL+6kyL31cGv9B4/Z0IbbSw/+Dnao2QxfUXIcEeACBhTIgJmhul/HQGW7HglBSsiRhbQBisfpq1XmpqOABGwnfLiOUAEVCCAAZ2RFJQO76TMmnx5+2XkqDkJEgH9qGdufxaRIBHQEAFY7VjhzxDmnZTlKj1RBtEnSlzTEiQCKidhEZCZAHRnLUt8PHg8uYbDVDLMBM1byVgQMBWOJUEvri6S2+ZWQ0UAM98eEjVvOrZUBPSY7DQCLNDxTpZFqiVBTJ6wpMDqK+LTmsRZfeGdNS8Z2eYBImBZNIiAYVhbNT6zklo8Arw3YXBixVQ1GNqMTHnzVgRc7MvygzbeSRkVASKgh1gEeId+BnmpFgG5Rj2z/sPI1Mnbh9dYHD2Yp+L0W7I5fvN11p4Z3cy6kFeOTAkSAWPORMA/TBQB49FhVT5MVcPYnJw+m5URy+D46Cz9i6mIIjZNS1CEJBEwUGtt4YuAqwiYiN0SSThCkhkBUO10Rm6QBA0Ei4AeCLxZv9MyVATsIwFEbSQJKilBIqBHICIvqoJ2VAVhN94la60FZZgHiIDKSVgEOAhAsHJNyoh82TH5gPGDNszaDuOTWbLWHbEJJEUAM7wGG0XADFjaFzQGqPiuCCYfaF9Qj5I2Zg2jZW93xjHRoM25fNKj9gVZ7rQ5d5nsIJ4iYGJ0WZtzsZytdj6AmZQxC3PWrBg/jzy4Q2fEHMlQh/T4nPG3zEpPMcfnrOHNekXAeM3HgtidA7wEWJLiPefFnC/DvnRSfoJypjbHZnpUwQSIioAelKYPansrHCYFMZJl+WFOuWBb5vgq2nuXoEPzACYCREDlJCwCGiKAISPX5MuSIO+kzKqmLP9NS5AI2J7hiswDrC5vy3NDm44AvDhvQmZCWM+OZmrCwUYE9EB474KFylBFQI9AJPFmI4Ahgwko/YIGg9KMjSVHjGsRwKAkAm4gENH9IhJkyRHDrX5HjEHJYYNyxDQTAQxKDhsRwIPlngnzruOWkcS+IYnpT+ZxwvEr5z2IAB6rIpYioAisvNOmCYhUVjdKPe/P5PH4hS1FQBjCmAMREMMv3PrWEBD+po06EAGViREBIqAyApW7/wMEo7nLWrnnggAAAABJRU5ErkJggg==");
        }

        .sprite-1 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAADqUlEQVR4Xu2dsY7TQBCGN1chgUR9HQ0SPABU9HRIvAYlHcVVV9BR8hpIdPRU8AAg0VxHjQQS1R0nxTKTxGPPeMcZ2/lSnZL1rDPf/v/OrmPfpvBKzcAmtXc6LwBIHgQAAEByBpK7RwEASM5AcvcoAADJGUjuHgUAIDkDyd2jAAD4M3Bz+xo6anP7Gmozh88XcZL7iQJA8tABQDAALaHSRmQbi7tIl9LiyK+RZVmzsCAABI9obzgAeDPmaG/0686IezbStnn87tfgGXx7fb9to8WRQQyFVZnCpia3IAD0jxUANPlZlQK8FYtmKdJGLLajjTVLHNlGi6NVVoN+2NNgEgUAwI4EAE2uFq8AbdRbrOP7xZt2yNx58bL9++/HD+3fjy7fdg6rq69f2vcfPHna2aYmvgzYU1mNHsijD+zbn5ErVQAcqQpCAXbf39kCGXfY4VE1AGQ0aRfy/SgLssS0VFNRFdEsLAgAATJAAeOSmKYArXqR709dBcmqyVJNraoKAsBWMSigcY5FKsDi+7KqsVQy0kmlBckFmsU6NCuTcWRflkWcPP8oO6pSAAC2CGtKUgA0MlitArxWYLEgb8GnWZkWx2J9i7EgAEy4F2SZAwAwIQAZWoOxufvK6xhte21r2hswKs7Nn/dt1zUT71E34wCAAspqFWCZAyx2IecJrQq6vvjx/6Nn58NhP/9s25xdPuy0NctCTOtoMVXQcKZKAYAlSx1tUEDCSjgq6RpzrWy9/vR75DAp5ez5vU4L0la/3o5q7Mi9FQGAQzwAGBiyJ60AbYK1yFzuyagWJKqdolRHGgDLOVgqpVkrAADBCzHvHACAZABemVMFDWTMqwAAoIB1rQMkzyg1sBXh9YmmPQAStiJQwDYDNbW/zKF7K0ITC1fExtkIABx545KkI1my6UlfEeNXEcHrAO8kDAAAlJP+ZRy/jk5WAAAAYLKgRf462jshy/bcorTNxuQLMe1OeQAAoFhudZKqjdr/OepekOVZEfKEuFN+5HI/amsaAABQM7BaC6p5no/l/t6a+CcxB9QkCAABlycBMNL3vVfHtPY8NREAO9d4ewZW+1HUU3TDVsKWbQkUcJiBSQBoMDQA2uPoeXZ0gDXx7OgJt6MtfACQDKAGEv9Bw5K9gDaaSgAQkFxLCABYsjSjNsZ5ZfIKLyIlizjJ/S8KgAj0FTEAUJE8Dt3NwCItaE0QAZBMEwAASM5AcvcoAADJGUjuHgUAIDkDyd2jgGQA/wDY/8Gtg0hFjwAAAABJRU5ErkJggg==");
        }

        .sprite-2 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAEQElEQVR4Xu2dMY7UQBBFPcEegAQEK0EIAcSgFRkgYkJiDoA4AeIEiAMQExIjIEMriCGAEKQFQcIBNoCVbHn+zHTZ9V1ttT3+G47aVe16Xb+r23bvqtJf0QisinqX80oACg8CARCAwhEo7F4ZIACFI1DYvTJAAApHoLB7ZYAAFI5AYffZMuDf2d/Qe1md/THXenyNYdPqI+sL7VA33hUkT1By3YDHFxsUj81c/ReARCRnCQA7TarIRggs9cJRzPpCm5adjZHIqaDZfzbzQhLEBsVKYQFgZkBoKwB1MKxs84SVzgAr6Fc/HfX6+3N8Idnm75PXyd+3bqxtc//L3V5fb66/a9tYdtDIuecPkjbPH/3u9fXt5rHlqze+vQ22vQvALg8BSIxRZUATFBwdVi5bkoJB9MiOZd9jB9tYdiyZnXQGCED3FDL6HCAABQBg0D3S8fnxlbaXBw/XW0qnr9bj48aL78k7+frxcvv7tVs/km0i9tEgyhTK0eQkSABqbJ5V8SgSJAAFAOBCBhdWHgnCNEe5wN9zSZDHpqeasu6XXRVnywABqLEJQGL4slm1iAywqhf8fewqCKsmTzWFVdDsJUgAmom6d6tvq4G1GcfOAQIwEADysGBg5YP666lk0D5KEC7QPNJhSRnaQV+eRRz2v2OzjypsqMbb2SIAwyofjKMANNHY2wxgpcAjQey8ZUmZZccjfbORIAHoHi6jS5AAjAjAUxFduvOIVYy2vbU1zRrMZefn+5eta3bLwepzKAMEoKnlA2+lCQCRTpPLAM86wHN/OE9YVdDJPXjadftiv9kPv9o2h2/XT83YhZhnYy4iR6EMEIAZLMT6h2pVKQM8UWra5Br1lkurbD15dkr0crPp4dODZGVlrX5ZR5FFGS1BArCLRwB6huyiM8DSd0+a456MKUFQ7VRGdWQB8PQB21iSNekMEIDMWxHsHCAAhQGwaa4qqCdibAYIgDKg2qsqyLMDyr6OqJUwqxOZV8UCIAAVuy0Rqf0x3PRWhMXKmpz1RCzzJCwA8S1oZcBAyZ3lEzG9FTGiBHkWZQIgANWi34zT29GFM0AABMAlQbN5O1pfyNQjWt+INZnt+bjOOqrA86UNCog+0kvIqQA0QWE/0rOmJvabXhYA+rW+WbP6tlcZIAB1BOjd0FyTsABkBmCdn+N5OhY5z4eVIPY8ImsS1nlBGaogz1EIAtBEwPORt2cxtYgMwFGjM+Myb0WwB7cKgABUiz43FPnr7OjdbMi2DtDh3XVw2Q/2BCCxlYLjdHKnp2Pn9P8Dho16jCGdAQKwq+Os7AhAojIMnDZA6342AFY2dFe+iUqAvHuUPsuX59jgUv0XgAQ1D9RcsAVgHwGwsqP2dQRCVZCCGI+AAMRjGLIgAKHwxS8WgHgMQxYEIBS++MUCEI9hyIIAhMIXv1gA4jEMWRCAUPjiFwtAPIYhC/8B88jbvMkSydwAAAAASUVORK5CYII=");
        }

        .sprite-3 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAEM0lEQVR4Xu1dQY7TQBB0zkhIXEC8gCeAVjwiuUTKM5B4BhLPiJRL8gi0gifwAgQXJCTOEMmWt51M21XjcTpxKqdVdrZ7XDVV0zO2ZxeVPqEILEKzK3klAoIHgQgQAcEIBKeXAkRAMALB6aUAERCMQHB6KWAuBPw7fnKvZXH8MH+L5JoiptdHNpeNQ114H0gIKKUuAMnFgoLELNV/EZBA8iYJsJ0mXaQDgededhSzuWxML05nJHIu6PafVd4oC2JB8SQsApgZ0LQVATUYntoQWGkFeKC/+fYwmO/X46tkm98f9snvTy6sbYMUXNYSvTg26YvPq2QfXj78HLyu728fk31D7EgENNCJgHRl0n7rjeie0tAblck/mS0BVp4ZkzBlOywZbBXk2exVW5AI6J9CJp8DREAAAZ4kva6sVk8VyGazaZttt9v25/0+XSntdru2zXq9TqYYE9+zKWtHV2dBIqCmLawMFQEBBNgyzi6skEWTlbm1C/t9KQtCYiLVFHK9F1UA0qHBJeWxgQgYQMnbihABNXDsvlCxMpQlwKte7PdTV0G2akKqKbsaR673qi1IBDQTNeLLtk0pCxIBmQQgZFgftJMqUsnY+NaC7AINsQ7PymwcmwtZxNn+92x3U7ZONT5Vi6cGEYD7ighosJqtAlgrQCwIH191S8/KvDiI9d2MBYmA/uEyuQWJgAkJQCqi5XLJOkbb3tuaZgOWinM4HNrU7IrX3V9iL8Zr71VEIkAKqGarAGQdgCjMzhNeFbR/9/fpV+9fD4f98qNts/r6LGlryELMtQ7zKOMYO5p8Eh5GqqpEAIJSoo0UUINyUQWUAt3j3N2O/vg8c5gcb/J8+pO0IG/1yyYasyijLUgEnNMjAgaG7F0rwJtgEZl37oh5FmSqncqpjjwCkD4gldJVK0AEFF6IsXOACAgmgJW5qqABxFgFiAApYF7rAMtnKTVoK4L1iaa9CAjYipACagTG1P4WQ3orwhOLbsjk2YgIIHDTLUkCLNv0ru+I6amIwusAdhIWASLgvp+M09PRwQoQASIAsqCbeTpab8jUI1rviDXKRl6u844qQN606WwbmIexRIAI6G5IISMCWcjqRe3MO2IiIG9rmt6MKzUJezxLAZkKQM7PQUDXeUEiwEXA3oRBBtxFjypAOiQFnCNQbA5AThTsuZuW/BV7VKUXH4mDnH2NXCP7qLoIaFgTAYnhi4xcZG2BxJktARYgnR0dMAeIgMLb0To9/RzQi54bitwTRnz5JI5XBbVFAvu/CrxqxMbxdjrH9B+p/Tt52WQi4BwxtvQUAQMVFzsowwjw1MBeACtbz0ZOLIVa4yAxexZ6VK5iChABNQLsABIBiaF88wpgbUftG/UIiFgEsieP2G7PJ7sICOZSBIiAYASC00sBIiAYgeD0UoAICEYgOL0UIAKCEQhO/x9Sbtu820itewAAAABJRU5ErkJggg==");
        }

        .sprite-4 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAElElEQVR4Xu1dO44UMRDdSUmWAImFhICIiAsgkaENiTgA4gZEJAQkRNwAcQAiwhUZEhcgIiIggUUiYBNSWNHGW9Ptcr/qsqftnTfZjMq/96pe2W67Z3PQ+efP+Sc1hM35p4ehddHJHJAkYAU3k6Brji4Do+Vo6DICSMAKXi+bJAErEKCB/uHOWbI39z8fxt9blqNuJIgErOD1iOwwAioSY/V6rSsty1HTEkQCKno3UjUJQFAKNtqKVKsCWRy1QECNcUlMiklQjY6SAEbAQQ3HKhYByIpU41DZxNwyl/s82nTT4CP/TLUZUUYqTU1YF30uCSIBU25IwIy/7kUEIHIhgRiteOPXXUqQtq1tHUsTEWDtNAkwpZkLY880kREw4FglCSMRgOzbeOpBfEo6gactz14TCQhMkYAARCmvZAQkEDg5+xl/PT68lsTo0dfX8fe3t54gOC62QdpC+tyNBCGDQUBZjPioINIW0mcSsJCR7gkYzd/jCTVkASU9S9bz5tc7kwRp9WgSJ9uSBDy++jBJo1aPx+tlQ65ZEAkYELCufklAQGAvIuDZzS8mhZYSJGVBkwKrBEl7rS2kwy+/3Y5mTUcACcjTWT0HkIAVCNhKMuKY/vUrr5DojjbazMRUScZYShBS54/fT5OyMxqvyalNxrlOZs7px2IkYIogCUBcP9g0EQGIp8sxIbuMyKJMypFVOrSy1sWXHBfyPAORJnMEkIABVhJgkI7uIwA5foJIDYIZIkenz08uqrp3I13tx+/x96MXx7MzK2TvCOk/EhnyWCYkQSQAgR6XJhKQwLO5CPCceMD9ZWqp7dVAsqM1DMhRKQK0Lqjb11oBEuBxo2lZEhAw0RLyahGAzOtrz3A0X5MLrtP3n2ZnO1sGyuzo6MHd2RmR1p9SJMlo2JAAXGpIQAorkWAZATPOpC2yKEEJBJCTDXjwDpYkYLpYYw4weFGVHMB1wIBAKXC5EJtJ1M2tAxgBjUaAJIa7oXii4Hb0f6yADTgJa6kcQAIuIwGaHMnfPdc8kadgfCgf0Eb2jiQxyEYeCcBzjPryCkbAAKL2Dgzt9TzQM2GEHyQyeDJuiiQJQLwr2DRxMg5ZuGnJmRGwowiQ+YDH0/MhVkWCSACuayQgYGW9i9DNFSVtHYDM/ZGb8tY7YtI39+KSHglYOQeQgIoEWE/PIe9dQF4fIIdUSoI0uUP67Lk170rCJGBwBRKQiHJkfx+JtksVAcjsmC9sQlBKbE2XOkdEAkiAAYHOcoAcGfjsNBZBHuwgyGUSZrI40m43SZgEFN4NtU5DScCOCECkgK+vH1CqshAjAQFc4B9dScCMtwAYbtVgfXuWiwDZco2/+vDkGC3fWAGqMS7ZNxIwEwEkIADkWWl75undEIAkXqtNCxJk7bPVvpgEWRtG7EkAglJFGxJQEVxr1VYyPLpv7ZvHvmkJ0qa5SEImAR63SJRlBBQG1FMdcmfNuuDy9MdTthsJQuRoZBO/In+d6wHRU5YEeNArULZLApA9qJa9vspeUAFnWFRF5mZOF87VRSdzzJCARX5brhAJKIflopp6J+AvMCU9nki9P+8AAAAASUVORK5CYII=");
        }

        .sprite-5 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAFKklEQVR4Xu1dLW8VQRR9T+BICAaCI0EQDCE1JA2i/AAENRgMro7wS0hdHQaDKYIfQAVpgnkhGIIgwREwhASHgIadN73bnbN77puZvt32VL1uZmdn77nnzJ07HzufTfzv79Ff6hXmR39TeLVJNLLPkAJgzW4mAARAlgUkQVnmy795bQBY6fB2mCfuTVrB9s2Z9Ve1UdXK2c4z00ACYBUiigGN1U6VAUg6GLlA9/5a3Erif2njU7yeUz9z7yoOuLxHAARL5DiHAEhYQAwY8Kyb7zej2T7fPUzKhbWrzSwg2UGeiMBA9TNt8wYOqG3VJQhRm3lJAZAjbmIAZb1iDEA5GYbmtgySoxoSZOu0jGTaAyXFmYUVAMGSAiAYQgyglKspxORkbHVvr9+O/+68uhh//zi8mnzqz2ev43Vv5MNERJefP0wWu7L5PV7fe/Q7/r7/9eOgdbwDtywJEgBdPATAgI/aMcGZZQAjF4vtC0lTbT+9Ea/v736Jvzf2/wzSnylgn4ueZethnusddbciQ6bRqIw3QWbrEQCNNar0AWJAMC4xJnAD0DMJXiRiscxg6J/D4FLPInNNSVsLgIBgDtgCYEUaTIYBTLxvB1nQm94YSz1IW62UURhMqGc524wGa2h8QEmQAAhwEk4jABjXD2VGzQBmIgW9q82fUHJkKlq8OB6gUR2jlQjbIOCtaCyy8QQM9Aivt3ktZBOYZPQOslDa1tYjALpWFQAJT2tJ0NgYYNvLyJFNKbdyOOjFAPVaEmTvRZLilSBTHj6L6EfsvTanZFPZPXMbMfjJioKsHAmABjUBsPRegjGTYQAjRyi3buWIYHarCIxMvBURcuet0sqOvdfO4jGTM5QECYAuPALA67KpKMiMObzVjQIA22ib+qbyQvZmEMkgjbbXGcNZKaN03zmIs+kHsGlzhpYyZkmQAGgsIAAGaDB5BjDZUGYakpGLGSFHWztmHdG9a+lq332L1w/2jtf5eHM+VJtNITs5cyJ4if9aOaIkSADwMAiApa2mwgC0WS5nyQnvL4mSIFdDyQ56MAMGEfnkvBdcOyQAglkFQDDEeWYAiutrRziI2nbQtPXyzmC00yoAoqODxx9iMXeuqRBLrBzNay+0ahkF5e4BAgIgGEYMKNtPtBhwYrAQT5/K2ZMFowUx4L9pBEDwkFH0AWKAI7qv0Qmjx2sg5gCGKAoHYgKgbAeL7CkAgmVgZrSQvBQDgOkbbJnaoWprTKB0dBdnAdDYROnopW8wGVDrR4UkqAoASI7sdU3KN9bQpHyiF5z8nLAY0EXVrqxe26oIKztamtiApKWJxKh0WcS7wMtWPYqVcWJAF+0qDNAGjUQfYNaVaoNGSnbO0v4AMWANDGCMjvo77ZLsWka7JBPeMupdkmJAQGxdG7XR6BedQURtynAefHGqO+XRkWjONp+/syK8+4SNZ436rAgxIFhgDAzwJuNyJmcor3SkG/qKlnqWTsxaERABMBQaFjorFOEzSQCYvoGRIJ0b2liS2iOGPChn8ZYAEACzM3t0MWKMjq/vWqaKBAmAIC81ji5mOmEBcEoAMAM0Wybnozk5G0Z6jpePzdM3ZIIp9A2ZFUeV+owVLzstVVjR3vRtzLyCPmVIm9NfUAD02ywrDGXgEABrBoAJW5nTBb1pD++HdVD9TNsYR0RlqjNAAIgBrTX76PC8c8GAHja4mMic4JUjHegInxypGYUECYDCybgcj8jxMjEgx/KF7+05bscla4WbRVc3iUb2vc3UAfgHVupjlcShYsYAAAAASUVORK5CYII=");
        }

        .sprite-6 {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAEhUlEQVR4Xu1du3LbMBC0f0IedyrUp9ekVJE6pT7DH5LPUJk6hcqMevcq1GWsn4g9IQMfSRy5R+AkQFp10hzx2L1bHI4g9fhQ+efvxyc2hcePTw1Tq2KQfSAl6BrOkpeSySABVw4TEkACMAQ02dlut9EGdrtd+L1kOaomAkgA5qhuViTADVq9YSvoWksly1HREkQCruD1sksSYCBA25FqTSCboxII8JiXxCSbBHkMlAQwAh48HCtbBCA1GY1DpYbWMZd1Hm3DZfCRf6ZaRjQilaYurJu+JAkiAUNuSMCEv95FBCByIYHopZ7h6yUlSCtrW+dSRARYB00CTMvMp3FKmsgIaHB0WYSRCEDqNintID4lnSClr5RaEwlomSIBLRC5vJIREEHgdDqFX5fLZRSj/X4fft9sNgiOs22QvpAxVyNByGQQUGYj3rsQ6QsZMwmYyUj1BPTy93BACtlASc+S7RyPR5MEae1oEif7kgSsVqsojVo7KV4vO0rKgkhAg4B190sCWgTuIgLW67VJoaUESVnQpMAqQdJe6wsZ8OFwCGZFRwAJGKfTfQ0gAVcgoLPIiFPii8UCie5go2UmpkZGjKUEIW2ez+eo7PTma3Jqk/HYIEfO6YfLSMAQQRKAuH5rU0QEIJ4u54RUGZFNmZQjq3Ro11o3X3JeyP0MRJrMEUACGlhJgEE6qo8A5PgJIjUIZogcvb18+Wzq63O82d9/wu9PP14nMyukdoSMH4kMeSwTkiASgECPSxMJiOBZXASknHjA/WVoqdVqINnROgbkKBcB2hDU8rV2AQlIcaPhtSSgxURbkIuIAG+v1zIczdfkhuvt57fJbKdjoGRHT99/TWZE2nhykSSjoZMFkYBx2SEBMXzEAssImFi3KEHDvQIlyJDsUIJuXYLk/LwXZM3xuBFrkSEBBm0CTLkRq2EjZi1LSHuWo1kN7foPUICTF3hkOL01NXxlOToS6kUToGVH8veUxzyRu2C8KR/JjkjAMJS0VzBob4eBbkkyAoZAI/d+ew4axdpMAJIpaZHBk3FD9EgAsIn6b1LEyThGQIOAVes13FwiQGZEPJ4+HmIkoMXHehSeT8i0wPERpcj+gI+p4iu7uwRpRTpk94u8qsAaARKau3hKkgQ4LsLWmzbIexeQ1wfIKeWKAC3akDGnPDWfJEEkoHEFEjCzvIxE201FAJIb8IVNCEozU0+kaRKAoEQCOihVswbIUSP1dGRDZ/CXqQUz2hRy2IAEGFgYAYsE9Mu8jIAJz0KentSa4OvrG2RcNmKIIpAAEqDe1ZIOZP1TVuvbs5IiQA7U468+rKUOLfJSshSPeXUIRuQCsfEYKAlAkI9sypDL+DdWGdYABOgUmxIiIGX8yLXZ1gCkM6sNCbAiltmeBGQGNKU5KxkpmU/KOK3XFi1BWpqLlChIgNUVZpY9+JfmmYFGmkNqUNYdKdKvh001EoTIUc8mfEX2HB7gIm2SAAQlR5sqCdCiQf5estd3xulI7kWaHnmRbBXOVcUgx5gkARfx89vtpPoIqJ0aEnBlBt8BQs4xnmxwbpYAAAAASUVORK5CYII=");
        }
    </style>
</head>

<body style="margin: 0;">
    <websocket-wrapper>
        <div class='absolute container touch-none select-none'>
            <div id='status'>Attempting to connect...</div>
            <div class="sprite"></div>
            <div id='capture-left' class='capture bg-red-300 absolute left-0 right-half h-full'>
                <div class='instruction-text touch-none select-none'>TURN LEFT</div>
            </div>
            <div id='capture-right' class='capture bg-green-300 absolute right-0 left-half h-full'>
                <div class='instruction-text touch-none select-none'>TURN RIGHT</div>
            </div>
        </div>
    </websocket-wrapper>
</body>

</html>

<script>
    class WebsocketWrapper extends HTMLElement {
        websocket = null

        connectedCallback() {
            const statusDiv = document.querySelector("#status")
            const spriteDiv = document.querySelector(".sprite")
            
            const buffer = new Uint8Array(1)
            const inputData = { left: false, right: false }

            this.websocket = new WebSocket("ws://<<IP>>:8083/")

            this.websocket.addEventListener("close", e => {
                statusDiv.textContent = "Connection closed."
            })

            this.websocket.addEventListener("error", e => {
                statusDiv.textContent = "Failed to connect."
            })

            this.websocket.addEventListener("open", e => {
                statusDiv.textContent = "Connected!"

                let byte = 1 << 5
                byte |= 1 << 4
                buffer[0] = byte
                this.websocket?.send(buffer)
            })

            this.websocket.addEventListener("message", async (event) => {
                const bytes = await event.data.bytes()
                const id = bytes[0]
                spriteDiv.classList.add('sprite-' + id)
            })

            const inputUpdate = () => {
                if (!inputData.left && !inputData.right) return

                let byte = 0
                byte |= (inputData.left ? 1 : 0) << 4
                byte |= (inputData.right ? 1 : 0) << 3
                byte |= 1 << 5

                buffer[0] = byte
                this.websocket?.send(buffer)
            }

            setInterval(inputUpdate, 20)

            const setCaptureInput = (side) => {
                const captureDiv = document.querySelector("#capture-" + side)

                captureDiv.addEventListener("mousedown", () => {
                    console.log("start", side)

                    inputData[side] = true
                })
                captureDiv.addEventListener("mouseup", () => {
                    console.log("end", side)

                    inputData[side] = false
                })

                captureDiv.addEventListener("touchstart", () => {
                    console.log("start", side)

                    inputData[side] = true
                })
                captureDiv.addEventListener("touchend", () => {
                    console.log("end", side)

                    inputData[side] = false
                })
            }

            setCaptureInput("left")
            setCaptureInput("right")

            // captureElement.addEventListener("click", evt => {
            //     const mouseEvent = evt as MouseEvent | null
            //     if (mouseEvent)
            //         this.websocket?.send(
            //             JSON.stringify({
            //                 x: mouseEvent.clientX / window.innerWidth,
            //                 y: mouseEvent.clientY / window.innerHeight,
            //             }),
            //         )
            // })

            // captureElement.addEventListener("touchstart", evt => {
            //     this.websocket?.send("yeh")
            //     const touchEvent = evt as TouchEvent | null
            //     if (touchEvent)
            //         this.websocket?.send(
            //             JSON.stringify({
            //                 x: touchEvent.touches[0].clientX / window.innerWidth,
            //                 y: touchEvent.touches[0].clientY / window.innerHeight,
            //             }),
            //         )
            // })
        }

        disconnectedCallback() {
            this.websocket?.close()
        }
    }

    customElements.define("websocket-wrapper", WebsocketWrapper)
</script>
`