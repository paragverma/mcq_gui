var app = angular.module('Astest', [])

    .filter('html',function($sce){
        return function(input){
            return $sce.trustAsHtml(input);
        }
    })
.controller('Ascontroller', function($scope, $document, $interval, $sce, $http){
    $scope.clickedonstart = 0;

    $scope.endtest = 0;
    $scope.questiontimes = [];
    $scope.nofquestions = 30;
    $scope.responses = [];

    $scope.pishape = $sce.trustAsHtml('&Pi;');

    /*visitedquestions array index start from 0, but inside the qnos start from 1*/
    $scope.visitedquestions = [];
    for(var i = 0; i < $scope.nofquestions; i++){
        $scope.questiontimes.push({
            "qno": (i + 1),
            "time": 0
        });
        $scope.visitedquestions.push({
                                    "qno": (i + 1),
                                    "visited": 0,
                                    "marked": 0
                                    });
        $scope.responses.push({
            "qno": (i + 1),
            "response": -1
        });
    }




    $scope.curentquestion = 1;
    $scope.currentime = 45 * 60;

    $scope.timerinterval = null;


    $scope.clickstart = function(){
        $scope.clickedonstart = 1;
        //console.log($scope.questiontimes);
        //console.log($scope.visitedquestions);
        $scope.visitedquestions[0].visited = 1;

        for(var i = 0; i < $scope.nofquestions; i++){
            for(var j = 0; j < 4; j++){
                var element = document.getElementById((i + 1) + "option" + (j + 1));
                //console.log(element);
                switch(j){
                    case 0: katex.render($scope.questionslist[i].option_1, element);
                        break;
                    case 1: katex.render($scope.questionslist[i].option_2, element);
                        break;
                    case 2: katex.render($scope.questionslist[i].option_3, element);
                        break;
                    case 3: katex.render($scope.questionslist[i].option_4, element);
                        break;
                }
                //katex.render($scope.questionslist[i].op, element);
            }
        }
        $scope.timerinterval = $interval(function(){
                                $document[0].getElementById("timerbutton").innerHTML = $scope.toTime($scope.currentime);
                                $scope.currentime = $scope.currentime - 1;
                                //console.log($scope.currentime);
                                $scope.questiontimes[$scope.curentquestion - 1].time++;
                                //console.log($scope.questiontimes);
                                if($scope.currentime < 0){
                                    $scope.finishtest();
                                }
                            }, 1000);


        //$scope.$apply();
    };

    $scope.clearquestion = function(number){
        var elemid = "question" + number;
        $document[0].getElementById(elemid).reset();
        $scope.visitedquestions[number - 1].marked = 0;
        $scope.responses[$scope.curentquestion - 1].response = -1;
        //$scope.$apply();
    }


    $scope.toTime = function(secondsinput){

            var sec_num = parseInt(secondsinput, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;

    }

    $scope.nextclicked = function(){
        $scope.curentquestion++;
        $scope.visitedquestions[$scope.curentquestion - 1].visited = 1;
    }

    $scope.previousclicked = function(){
        $scope.curentquestion--;
        $scope.visitedquestions[$scope.curentquestion - 1].visited = 1;
    }

    $scope.showQuestion = function(qno){
        if(qno == $scope.curentquestion) return 1;
        return 0;
    }

    $scope.prevdisabled = function(qno){
        if(qno == 1) return "disabled";
    }

    $scope.nextdisabled = function(qno){
        if(qno == $scope.nofquestions) return "disabled";
    }

    $scope.optionselected = function(qno, option){
        $scope.responses[qno - 1].response = option;
        $scope.visitedquestions[qno - 1].marked = 1;
    }

    $scope.numberclick = function (qno) {
        $scope.curentquestion = qno;
        $scope.visitedquestions[qno - 1].visited = 1;
    };

    $scope.optioncolor = function(qno){
        if($scope.visitedquestions[qno - 1].marked == 1) return "#76ff03";
        if($scope.visitedquestions[qno - 1].visited == 1) return "#03a9f4";
    }

    $scope.finishtest = function () {
        $scope.endtest = 1;
        $interval.cancel($scope.timerinterval);
        console.log($scope.questiontimes);
        console.log($scope.responses);
        console.log($scope.questiontimes);
        console.log($scope.currentime);
        //$scope.$apply();
    }








/*
* "option_1": " 48sqrt{3} sq.cm",
 "option_2": "128sqrt{3} sq.cm",
 "option_3": "9.6sqrt{3} sq.cm",
 "option_4": "64sqrt{3} sq.cm",*/

    $scope.questionslist = [
        {
            "serial_no": 1,
            "question": "What is the area of an equilateral triangle of side 16 cm?",
            "image": "",
            "option_1": "48\\sqrt{3}\\ \\ sq.cm",
            "option_2": "128\\sqrt{3} \\ \\ sq.cm",
            "option_3": "9.6\\sqrt{3} \\ \\ sq.cm",
            "option_4": "\\frac{154 \\times 7}{2 \\times 2 \\times 22} \\ \\ cm",
            "correct_option": 4,
            "Answer Explanation": "Area of an equilateral triangle = &Pi;3/4 S2 \nIf S = 16, Area of triangle = &Pi;3/4 * 16 * 16 = 64&Pi;3 cm2\n"
        },
        {
            "serial_no": 2,
            "question": "If the sides of a triangle are 26 cm, 24 cm and 10 cm, what is its area?",
            "image": "",
            "option_1": "120 \\ sq.cm\n",
            "option_2": "130 \\ sq.cm",
            "option_3": "312 \\ sq.cm",
            "option_4": "315 \\ sq.cm",
            "correct_option": 1,
            "Answer Explanation": "The triangle with sides 26 cm, 24 cm and 10 cm is right angled, where the hypotenuse is 26 cm.\nArea of the triangle = 1/2 * 24 * 10 = 120 cm2\n"
        },
        {
            "serial_no": 3,
            "question": "The perimeter of a triangle is 28 cm and the in-radius of the triangle is 2.5 cm. What is the area of the triangle?",
            "image": "",
            "option_1": "25 \\ sq.cm",
            "option_2": "42 \\ sq.cm",
            "option_3": "49 \\ sq.cm",
            "option_4": "35 \\ sq.cm",
            "correct_option": 4,
            "Answer Explanation": "Area of a triangle = r * s\nWhere r is the in-radius and s is the semi perimeter of the triangle.\nArea of triangle = 2.5 * 28/2 = 35 cm2\n"
        },
        {
            "serial_no": 4,
            "question": "Find the area of trapezium whose parallel sides are 20 cm and 18 cm long, and the distance between them is 15 cm.",
            "image": "",
            "option_1": "225 \\ sq.cm",
            "option_2": "275 \\ sq.cm",
            "option_3": "285 \\ sq.cm",
            "option_4": "315 \\ sq.cm",
            "correct_option": 3,
            "Answer Explanation": "Area of a trapezium = 1/2 (sum of parallel sides) * (perpendicular distance between them) = 1/2 (20 + 18) * (15) = 285 cm2"
        },
        {
            "serial_no": 5,
            "question": "Find the area of a parallelogram with base 24 cm and height 16 cm.",
            "image": "",
            "option_1": "262 \\ sq.cm",
            "option_2": "384 \\ sq.cm",
            "option_3": "192 \\ sq.cm",
            "option_4": "131 \\ sq.cm",
            "correct_option": 2,
            "Answer Explanation": "Area of a parallelogram = base * height = 24 * 16 = 384 cm2"
        },
        {
            "serial_no": 6,
            "question": "The ratio of the length and the breadth of a rectangle is 4:3 and the area of the rectangle is 6912 sq cm. Find the ratio of the breadth and the area of the rectangle?",
            "image": "",
            "option_1": "1:96",
            "option_2": "1:48",
            "option_3": "1:84",
            "option_4": "1:68",
            "correct_option": 1,
            "Answer Explanation": "Let the length and the breadth of the rectangle be 4x cm and 3x respectively.\n(4x) (3x) = 6912\n12x2 = 6912 \nx2 = 576 = 4 * 144 = 22 * 122 (x > 0)\n=> x = 2 * 12 = 24\nRatio of the breadth and the areas = 3x:12x2 = 1:4x = 1: 96.\n"
        },
        {
            "serial_no": 7,
            "question": "The area of the square formed on the diagonal of a rectangle as its side is 108 1/3 % more than the area of the rectangle. If the perimeter of the rectangle is 28 units, find the difference between the sides of the rectangle?",
            "image": "",
            "option_1": "8",
            "option_2": "12",
            "option_3": "6",
            "option_4": "2",
            "correct_option": 4,
            "Answer Explanation": "Let the sides of the rectangle be l and b respectively.\nFrom the given data, \n(?l2 + b2) = (1 + 108 1/3 %)lb \n=> l2 + b2 = (1 + 325/3 * 1/100)lb\n= (1 + 13/12)lb\n= 25/12 lb\n=> (l2 + b2)/lb = 25/12 \n12(l2 + b2) = 25lb \nAdding 24lb on both sides \n12l2 + 12b2 + 24lb = 49lb \n12(l2 + b2 + 2lb) = 49lb \nbut 2(l + b) = 28 => l + b = 14 \n12(l + b)2 = 49lb \n=> 12(14)2 = 49lb \n=> lb = 48 \nSince l + b = 14, l = 8 and b = 6 \nl - b = 8 - 6 = 2m.\n"
        },
        {
            "serial_no": 8,
            "question": "The length of a rectangular plot is thrice its breadth. If the area of the rectangular plot is 867 sq m, then what is the breadth of the rectangular plot?",
            "image": "",
            "option_1": "8.5m",
            "option_2": "17m",
            "option_3": "34m",
            "option_4": "51m",
            "correct_option": 2,
            "Answer Explanation": "Let the breadth of the plot be b m.\nLength of the plot = 3 b m\n(3b)*(b) = 867\n3b^2 = 867 \nb^2 = 289 = 172 (b > 0)\nb = 17 m.\n"
        },
        {
            "serial_no": 9,
            "question": "The length of a rectangular floor is more than its breadth by 200%. If Rs. 324 is required to paint the floor at the rate of Rs. 3 per sq m, then what would be the length of the floor?",
            "image": "",
            "option_1": "27m",
            "option_2": "24m",
            "option_3": "18m",
            "option_4": "21m",
            "correct_option": 3,
            "Answer Explanation": "Let the length and the breadth of the floor be l m and b m respectively.\nl = b + 200% of b = l + 2b = 3b\nArea of the floor = 324/3 = 108 sq m\nl b = 108 i.e., l * l/3 = 108\nl^2 = 324 => l = 18.\n"
        },
        {
            "serial_no": 10,
            "question": "An order was placed for the supply of a carpet whose breadth was 6 m and length was 1.44 times the breadth. What will be the cost of a carpet whose length and breadth are 40% more and 25% more respectively than the first carpet? Given that the rate of carpet is Rs. 45 per sq m",
            "image": "",
            "option_1": "Rs. \\ 3642.40\n",
            "option_2": "Rs. \\ 3868.80",
            "option_3": "Rs. \\ 4216.20",
            "option_4": "Rs. \\ 4082.40",
            "correct_option": 4,
            "Answer Explanation": "Length of the first carpet = (1.44)(6) = 8.64 cm\nArea of the second carpet = 8.64(1 + 40/100) 6 (1 + 25/100)\n= 51.84(1.4)(5/4) sq m = (12.96)(7) sq m\nCost of the second carpet = (45)(12.96 * 7) = 315 (13 - 0.04) = 4095 - 12.6 = Rs. 4082.40\n"
        },
        {
            "serial_no": 11,
            "question": "What will be the cost of building a fence around a square plot with area equal to 289 sq ft, if the price per foot of building the fence is Rs. 58?",
            "image": "",
            "option_1": "Rs. \\ 3944",
            "option_2": "Rs. \\ 3828",
            "option_3": "Rs. \\ 4176",
            "option_4": "Cannot \\ be \\ determined",
            "correct_option": 1,
            "Answer Explanation": "Let the side of the square plot be a ft.\na2 = 289 => a = 17\nLength of the fence = Perimeter of the plot = 4a = 68 ft.\nCost of building the fence = 68 * 58 = Rs. 3944\n"
        },
        {
            "serial_no": 12,
            "question": "The area of a square is equal to five times the area of a rectangle of dimensions 125 cm * 64 cm. What is the perimeter of the square?",
            "image": "",
            "option_1": "600 \\ cm",
            "option_2": "800 \\ cm",
            "option_3": "400 \\ cm",
            "option_4": "1000 \\ cm",
            "correct_option": 2,
            "Answer Explanation": "Area of the square = s * s = 5(125 * 64)\n=> s = 25 * 8 = 200 cm\nPerimeter of the square = 4 * 200 = 800 cm.\n"
        },
        {
            "serial_no": 13,
            "question": "A wire in the form of a circle of radius 3.5 m is bent in the form of a rectangle, whose length and breadth are in the ratio of 6:5. What is the area of the rectangle?",
            "image": "",
            "option_1": "60 \\ sq.\\ cm",
            "option_2": "30 \\ sq.\\ cm",
            "option_3": "45 \\ sq.\\ cm",
            "option_4": "15 \\ sq.\\ cm",
            "correct_option": 2,
            "Answer Explanation": "The circumference of the circle is equal to the perimeter of the rectangle. \nLet l = 6x and b = 5x 2(6x + 5x) = 2 * 22/7 * 3.5 \n => x = 1 \nTherefore, l = 6 cm and b = 5 cm Area of the rectangle = 6 * 5 = 30 cm2\n"
        },
        {
            "serial_no": 14,
            "question": "The area of a square is 4096 sq cm. Find the ratio of the breadth and the length of a rectangle whose length is twice the side of the square and breadth is 24 cm less than the side of the square",
            "image": "",
            "option_1": "1:5",
            "option_2": "7:16",
            "option_3": "5:14",
            "option_4": "5:32",
            "correct_option": "Option E",
            "Answer Explanation": "Let the length and the breadth of the rectangle be l cm and b cm respectively. Let the side of the square be a cm. \na2 = 4096 = 212 \na = (212)1/2 = 26 = 64 \nL = 2a and b = a - 24 \nb : l = a - 24 : 2a = 40 : 128 = 5 : 16\n"
        },
        {
            "serial_no": 15,
            "question": "The perimeter of a square is double the perimeter of a rectangle. The area of the rectangle is 480 sq cm. Find the area of the square",
            "image": "",
            "option_1": "200 \\ sq.\\ cm",
            "option_2": "72 \\ sq.\\ cm",
            "option_3": "162 \\ sq.\\ cm",
            "option_4": "Cannot be determined",
            "correct_option": 4,
            "Answer Explanation": "Let the side of the square be a cm. Let the length and the breadth of the rectangle be l cm and b cm respectively. \n4a = 2(l + b) \n2a = l + b \nl. b = 480 \nWe cannot find (l + b) only with the help of l. b. Therefore a cannot be found. \nArea of the square cannot be found.\n"
        },
        {
            "serial_no": 16,
            "question": "The circumference of a circle is 200? cm. Find the area of the semicircle formed by the same radius.",
            "image": "",
            "option_1": "\\pi \\ sq.m",
            "option_2": "\\pi/2 \\ sq.m",
            "option_3": "2\\pi \\ sq.m",
            "option_4": "(\\pi+2) \\ sq.m",
            "correct_option": 2,
            "Answer Explanation": "Circumference of a circle = 2?r\nHence, r=100cm=1m\nArea of semicircle=?(r^2)/2\n  =?/2 sq. m\n"
        },
        {
            "serial_no": 17,
            "question": "The circumferences of two circles are 264 meters and 352 meters. Find the difference between the areas of the larger and the smaller circles",
            "image": "",
            "option_1": "4192 sq m\n",
            "option_2": "4304 sq m",
            "option_3": "4312 sq m",
            "option_4": "4360 sq m",
            "correct_option": 3,
            "Answer Explanation": "Let the radii of the smaller and the larger circles be s m and l m respectively. \n2?s = 264 and 2?l = 352 \ns = 264/2? and l = 352/2? \nDifference between the areas = ?l2 - ?s2 \n= ?{1762/?2 - 1322/?2} \n= 1762/? - 1322/? \n= (176 - 132)(176 + 132)/? \n= (44)(308)/(22/7) = (2)(308)(7) = 4312 sq m\n"
        },
        {
            "serial_no": 18,
            "question": "A 25 cm wide path is to be made around a circular garden having a diameter of 4 meters. Approximate area of the path is square meters is",
            "image": "",
            "option_1": "3.34",
            "option_2": "2",
            "option_3": "4.5",
            "option_4": "5.5",
            "correct_option": 1,
            "Answer Explanation": "Area of the path = Area of the outer circle - Area of the inner circle = ?{4/2 + 25/100}2 - ?[4/2]2 \n= ?[2.252 - 22] = ?(0.25)(4.25)  { (a2 - b2 = (a - b)(a + b) } \n= (3.14)(1/4)(17/4) = 53.38/16 = 3.34 sq m\n"
        },
        {
            "serial_no": 19,
            "question": "There are two circles of different radii. The area of a square is 784 sq cm and its side is twice the radius of the larger circle. The radius of the larger circle is seven - third that of the smaller circle. Find the circumference of the smaller circle.",
            "image": "",
            "option_1": "6\\pi \\ cm",
            "option_2": "8\\pi \\ cm",
            "option_3": "12\\pi \\ cm",
            "option_4": "16\\pi \\ cm",
            "correct_option": 3,
            "Answer Explanation": "Let the radii of the larger and the smaller circles be l cm and s cm respectively. Let the side of the square be a cm. \na2 = 784 = (4)(196) = (22).(142) \na = (2)(14) = 28 \na = 2l, l = a/2 = 14 \nl = (7/3)s \nTherefore s = (3/7)(l) = 6 Circumference of the smaller circle = 2?s = 12? cm.\n"
        },
        {
            "serial_no": 20,
            "question": "A cube of side one-meter length is cut into small cubes of side 10 cm each. How many such small cubes can be obtained?",
            "image": "",
            "option_1": "10",
            "option_2": "100",
            "option_3": "1000",
            "option_4": "10000",
            "correct_option": 3,
            "Answer Explanation": "Along one edge, the number of small cubes that can be cut \n= 100/10 = 10 \nAlong each edge 10 cubes can be cut. (Along length, breadth and height). Total number of small cubes that can be cut = 10 * 10 * 10 = 1000\n"
        },
        {
            "serial_no": 21,
            "question": "The dimensions of a room are 25 feet * 15 feet * 12 feet. What is the cost of white washing the four walls of the room at Rs. 5 per square feet if there is one door of dimensions 6 feet * 3 feet and three windows of dimensions 4 feet * 3 feet each?",
            "image": "",
            "option_1": "Rs. 4800",
            "option_2": "Rs. 3600",
            "option_3": "Rs. 3560",
            "option_4": "Rs. 4530",
            "correct_option": 4,
            "Answer Explanation": "Area of the four walls = 2h(l + b)\nSince there are doors and windows, area of the walls = 2 * 12 (15 + 25) - (6 * 3) - 3(4 * 3) = 906 sq.ft.\nTotal cost = 906 * 5 = Rs. 4530\n"
        },
        {
            "serial_no": 22,
            "question": "The radius of a wheel is 22.4 cm. What is the distance covered by the wheel in making 500 revolutions?",
            "image": "",
            "option_1": "252 m",
            "option_2": "704 m",
            "option_3": "352 m",
            "option_4": "808 m",
            "correct_option": 2,
            "Answer Explanation": "In one revolution, the distance covered by the wheel is its own circumference. Distance covered in 500 revolutions. \n= 500 * 2 * 22/7 * 22.4 = 70400 cm = 704 m\n"
        },
        {
            "serial_no": 23,
            "question": "The volumes of two cones are in the ratio 1:10 and the radii of the cones are in the ratio of 1:2. What is the ratio of their heights?",
            "image": "",
            "option_1": "4:5",
            "option_2": "1:5",
            "option_3": "3:5",
            "option_4": "4:5",
            "correct_option": 1,
            "Answer Explanation": "The volume of the cone = (1/3)?r2h \nOnly radius (r) and height (h) are varying.\nHence, (1/3)? may be ignored. \nV1/V2 = r12h1/r22h2  => 1/10  =  (1)2h1/(2)2h2 \n=> h1/h2 = 2/5  \ni.e. h1 : h2 = 2 : 5\n"
        },
        {
            "serial_no": 24,
            "question": "A metallic sphere of radius 12 cm is melted and drawn into a wire, whose radius of cross section is 16 cm. What is the length of the wire?",
            "image": "",
            "option_1": "45 cm",
            "option_2": "18 cm",
            "option_3": "90 cm",
            "option_4": "180 cm",
            "correct_option": "Option E",
            "Answer Explanation": "Volume of the wire (in Cylindrical shape) is equal to the volume of the sphere. \n ?(16)2 * h = (4/3)? (12)3 => h = 9 cm\n"
        },
        {
            "serial_no": 25,
            "question": "A plot ABCD is as shown in figure, where AF = 30 m, CE = 40 m, ED = 50 m, AE = 120 m. Find the area of the plot ABCD?",
            "image": "data/Q25.png",
            "option_1": "1800 sq.m",
            "option_2": "2400 sq.m",
            "option_3": "3600 sq.m",
            "option_4": "7200 sq.m",
            "correct_option": 4,
            "Answer Explanation": "Area of plot ABCD = Area of ADE + Area of AFB + Area of BCEF = 1/2 * 50 * 120 + 1/2 * 40 * 30 + 40 * 90 = 3000 + 600 + 3600 = 7200 sq.m"
        },
        {
            "serial_no": 26,
            "question": "The ratio of the volumes of two cubes is 729 : 1331. What is the ratio of their total surface areas?",
            "image": "",
            "option_1": "81:121",
            "option_2": "9:11",
            "option_3": "729:1331",
            "option_4": "27:121",
            "correct_option": 1,
            "Answer Explanation": "Ratio of the sides = �?729 : �?1331 = 9 : 11\nRatio of surface areas = 92 : 112 = 81 : 121\n"
        },
        {
            "serial_no": 27,
            "question": "Find the area of a rhombus whose side is 25 cm and one of the diagonals is 30 cm?",
            "image": "data/Q27.png",
            "option_1": "225 sq.m",
            "option_2": "360 sq.m",
            "option_3": "720 sq.m",
            "option_4": "480 sq.m",
            "correct_option": "Option E",
            "Answer Explanation": "Consider the rhombus ABCD. Let the diagonals intersect at E. Since diagonals bisect at right angles in a rhombus. \nBE2 + AE2 = AB2 \n252 = 152 + AE2 AE = ? (625 - 225) = ?400 = 20, \nAC = 20 + 20 = 40 cm. \nArea of a rhombus = 1/2 * d1d2 \n= 1/2 * 40 * 30 = 600 sq.cm.\n"
        },
        {
            "serial_no": 28,
            "question": "The sector of a circle has radius of 21 cm and central angle 135o. Find its perimeter?",
            "image": "",
            "option_1": "91.5 cm",
            "option_2": "93.5 cm",
            "option_3": "94.5 cm",
            "option_4": "92.5 cm",
            "correct_option": 1,
            "Answer Explanation": "Perimeter of the sector = length of the arc + 2(radius) \n= (135/360 * 2 * 22/7 * 21) + 2(21) \n= 49.5 + 42 = 91.5 cm\n"
        },
        {
            "serial_no": 29,
            "question": "An order was placed for the supply of a carpet whose length and breadth were in the ratio of 3:2. Subsequently, the dimensions of the carpet were altered such that its length and breadth were in the ratio 7:3 but were was no change in its perimeter. Find the ratio of the areas of the carpets in both the cases.",
            "image": "",
            "option_1": "4:3",
            "option_2": "8:7",
            "option_3": "4:1",
            "option_4": "6:5",
            "correct_option": 2,
            "Answer Explanation": "Let the length and breadth of the carpet in the first case be 3x units and 2x units respectively. \nLet the dimensions of the carpet in the second case be 7y, 3y units respectively.\n From the data,\n2(3x + 2x) = 2(7y + 3y)\n => 5x = 10y \n=> x = 2y \nRequired ratio of the areas of the carpet in both the cases \n= 3x*2x:7y*3y \n= 6x2:21y2 \n= 6 * (2y)2 :21y2 \n= 6 * 4y2:21y2  \n= 8:7\n"
        },
        {
            "serial_no": 30,
            "question": "Find the volume of a sphere with radius 3cm.",
            "image": "",
            "option_1": "123.1 sq.cm",
            "option_2": "113.1 sq.cm",
            "option_3": "213.1 sq.cm",
            "option_4": "321.1 sq.cm",
            "correct_option": 2,
            "Answer Explanation": "Volume of sphere= (4/3)?r^3\nHence, Volume= (4/3)?*(3)^3\n  = 113.1 sq.cm\n"
        }
    ]
});
