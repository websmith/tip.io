$(document).ready(function() {

    var toggleBtn = $('#formDisplayType');
    var calcBtn = $('#calc');
    var customP = $('.custPerc');
    var btnTgl = [
        false,
        false,
        false,
        false
    ];
    var percentForm = $('#percentCalc');
    var reverseForm = $('#reverseCalc');
    var customTips = $('#customTips');
    var fixedTips = $('#fixedTips');
    var resultType = $('#resultType');
    var resultDisplay = $('#resultDisplay');

    var calcType = 0;
    var calcTypeStore;
    var billVal;
    var tipVal;
    var answer = 0;


    // / / / / / / / / / / / / / / / / 
    // Start Style Manipulations
    // / / / / / / / / / / / / / / / / 

    $('#tipPercent_p_custom').parent('.ui-input-text').css({
        display: 'inline-block',
        width: '49.25%'
    });

    // / / / / / / / / / / / / / / / / 
    // End Style Manipulations
    // / / / / / / / / / / / / / / / / 


    // / / / / / / / / / / / / / / / / 
    // Start Button / Form Controls
    // / / / / / / / / / / / / / / / / 

    // Start Clear All Inputs
    function clearAllInputs() {
        $('#tipPercent_p_custom').val(null);
        $('#tipTotal_r').val(null);
        $('#billTotal_p').val(null);
        $('#billTotal_r').val(null);
        btnTgl[0] = false;
        btnTgl[1] = false;
        btnTgl[2] = false;
        btnTgl[3] = false;
        $('#percBtn-1').removeClass('btn-perc-active');
        $('#percBtn-2').removeClass('btn-perc-active');
        $('#percBtn-3').removeClass('btn-perc-active');
        $('#percBtn-4').removeClass('btn-perc-active');
    }
    // End Clear All Inputs

    // Start Fixed Percent Buttons
    function buttonOff(x, y, z) {
        btnTgl[x - 1] = false;
        btnTgl[y - 1] = false;
        btnTgl[z - 1] = false;
        pbx = '#percBtn-' + x;
        pby = '#percBtn-' + y;
        pbz = '#percBtn-' + z;
        $(pbx).removeClass('btn-perc-active');
        $(pby).removeClass('btn-perc-active');
        $(pbz).removeClass('btn-perc-active');
    }
    $('#percBtn-1').click(function() {
        if (btnTgl[0] === false) {
            btnTgl[0] = true;
            $('#percBtn-1').addClass('btn-perc-active');
        } else {
            btnTgl[0] = false;
            $('#percBtn-1').removeClass('btn-perc-active');
        }
        buttonOff(2, 3, 4);
    });
    $('#percBtn-2').click(function() {
        if (btnTgl[1] === false) {
            btnTgl[1] = true;
            $('#percBtn-2').addClass('btn-perc-active');
        } else {
            btnTgl[1] = false;
            $('#percBtn-2').removeClass('btn-perc-active');
        }
        buttonOff(1, 3, 4);
    });
    $('#percBtn-3').click(function() {
        if (btnTgl[2] === false) {
            btnTgl[2] = true;
            $('#percBtn-3').addClass('btn-perc-active');
        } else {
            btnTgl[2] = false;
            $('#percBtn-3').removeClass('btn-perc-active');
        }
        buttonOff(1, 2, 4);
    });
    $('#percBtn-4').click(function() {
        if (btnTgl[3] === false) {
            btnTgl[3] = true;
            $('#percBtn-4').addClass('btn-perc-active');
        } else {
            btnTgl[3] = false;
            $('#percBtn-4').removeClass('btn-perc-active');
        }
        buttonOff(1, 2, 3);
    });
    // End Fixed Percent Buttons

    // Start Toggle Calc Type
    var formToggled = false;
    toggleBtn.text("Tip By Custom Amount");
    reverseForm.hide();

    function toggleForm() {
        clearAllInputs();
        reverseForm.toggle("slow");
        percentForm.toggle("slow");
        if (formToggled == false) {
            resultType.text('Percent Tipped');
            resultDisplay.text('0.00%');
            formToggled = true;
            toggleBtn.text("Tip By Percent");
            calcTypeStore = calcType;
            calcType = 2;
        } else {
            formToggled = false;
            resultType.text('Amount Tipped');
            resultDisplay.text('$0.00');
            toggleBtn.text("Tip By Custom Amount");
            calcType = calcTypeStore;
        }
    }

    toggleBtn.on("click", toggleForm);
    // End Toggle Calc Type


    // Start Toggle Custom Percent
    var custPercent = false;
    customTips.hide();

    function toggleCustom() {
        clearAllInputs();
        resultType.text('Amount Tipped');
        resultDisplay.text('$0.00');
        customTips.toggle("slow");
        fixedTips.toggle("slow");
        if (custPercent == false) {
            custPercent = true;
            calcType = 1;
        } else {
            custPercent = false;
            calcType = 0;
        }
    }
    customP.on("click", toggleCustom);
    // End Toggle Custom Percent

    // / / / / / / / / / / / / / / / / 
    // End Form Controls
    // / / / / / / / / / / / / / / / / 


    // / / / / / / / / / / / / / / / / 
    // Start Calculator Function
    // / / / / / / / / / / / / / / / /

    // Start Main Calculator
    function calculator() {
        var tipPercentFixed;
        switch (true) {
            case btnTgl[0]:
                tipPercentFixed = 10;
                break;
            case btnTgl[1]:
                tipPercentFixed = 15;
                break;
            case btnTgl[2]:
                tipPercentFixed = 20;
                break;
            case btnTgl[3]:
                tipPercentFixed = 30;
                break;
            default:
                tipPercentFixed = 0;
                break;
        }
        billVal = [
            $('#billTotal_p').val(),
            $('#billTotal_r').val()
        ];
        tipVal = [
            tipPercentFixed,
            $('#tipPercent_p_custom').val(),
            $('#tipTotal_r').val()
        ];

        var regex = /^\d+\.?\d{0,2}$/;

        if (regex.test(billVal[0]) || regex.test(billVal[1]) || regex.test(tipVal[1]) || regex.test(tipVal[2])) {
            switch (calcType) {
                case 0:
                    resultType.text('Amount Tipped ');
                    answer = "$" + ((tipVal[0] / 100) * billVal[0]).toFixed(2);
                    break;
                case 1:
                    resultType.text('Amount Tipped ');
                    answer = "$" + ((tipVal[1] / 100) * billVal[0]).toFixed(2);
                    break;
                case 2:
                    resultType.text('Percent Tipped ');
                    answer = Math.abs((tipVal[2] / billVal[1]) * 100).toFixed(2) + "%";
                    break;
                default:
                    resultType.text('Amount Tipped ');
                    answer = 0;
                    break;
            }
            resultDisplay.text(answer);
        } else {
            alert("Incorrect Input, Please Try Again :(");
            clearAllInputs();
        }
    }
    calcBtn.on("click", calculator);
    // End Main Calculator

    // / / / / / / / / / / / / / / / / 
    // End Calculator Function
    // / / / / / / / / / / / / / / / / 

});
