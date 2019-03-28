# 🍣sushi-term🍣
[![CircleCI](https://circleci.com/gh/aozou99/sushi-term.svg?style=svg)](https://circleci.com/gh/aozou99/sushi-term)

## Let's order Sushi!
https://aozou99.github.io/sushi-term/

### Show menu
```
taisyo menu
```
![result](https://user-images.githubusercontent.com/21310288/55197082-c629a980-51f4-11e9-9f1a-b87dd577823a.gif)

### Order meal
#### single
```
taisyo order meal1[, meal2, ..., mealN]
```
![result](https://user-images.githubusercontent.com/21310288/55196991-806ce100-51f4-11e9-9a34-397bd147010b.gif)

#### multiple
```
taisyo order -n meal1:number1[,meal2:number2,...,mealN:numberN]
```
![result](https://user-images.githubusercontent.com/21310288/55196899-2f5ced00-51f4-11e9-866b-e27dfb1d7322.gif)

#### rolling
```
taisyo order -r [single or multiple]
```
![result](https://user-images.githubusercontent.com/21310288/55196801-e016bc80-51f3-11e9-8787-71adb2e6f0c6.gif)

### Bill
```
taisyo bill
```
![result](https://user-images.githubusercontent.com/21310288/55196613-39cab700-51f3-11e9-8bc5-f8726b5b3c77.gif)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```
