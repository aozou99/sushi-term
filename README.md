# 🍣sushi-term🍣
[![CircleCI](https://circleci.com/gh/aozou99/sushi-term.svg?style=svg)](https://circleci.com/gh/aozou99/sushi-term)

## Let's order Sushi!
https://aozou99.github.io/sushi-term/

### Show menu
```
taisyo menu
```
![result](https://user-images.githubusercontent.com/21310288/55194308-a1313880-51ec-11e9-82f0-e4faa7e2bd8b.gif)

### Order meal
#### single
```
taisyo order meal1[, meal2, ..., mealN]
```
![result](https://user-images.githubusercontent.com/21310288/55194745-db4f0a00-51ed-11e9-8ebb-10ca7cad92ae.gif)

#### multiple
```
taisyo order -n meal1:number1[,meal2:number2,...,mealN:numberN]
```
![result](https://user-images.githubusercontent.com/21310288/55195399-c7a4a300-51ef-11e9-88a3-2ec977fd0d0b.gif)

#### rolling
```
taisyo order -r [single or multiple]
```
![result](https://user-images.githubusercontent.com/21310288/55195871-30404f80-51f1-11e9-8f89-e2e1d7804e1e.gif)

### Bill
```
taisyo bill
```
![result](https://user-images.githubusercontent.com/21310288/55196117-c6747580-51f1-11e9-8021-2d9d966d8f55.gif)

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
