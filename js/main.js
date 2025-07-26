(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);


// BMI Calculator Logic
function calculateBMI() {
    // Get input values
    const weight = parseFloat(document.querySelector('input[placeholder="Weight (KG)"]').value);
    const height = parseFloat(document.querySelector('input[placeholder="Height (CM)"]').value);
    const age = parseInt(document.querySelector('input[placeholder="Age"]').value);
    const gender = document.querySelector('select').value;

    // Validation
    if (!weight || !height || !age || gender === 'Gender') {
        alert('Please fill all fields correctly');
        return;
    }

    if (weight <= 0 || height <= 0 || age <= 0) {
        alert('Please enter valid positive numbers');
        return;
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine BMI category
    let category = '';
    let categoryClass = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        categoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryClass = 'overweight';
    } else {
        category = 'Obese';
        categoryClass = 'obese';
    }

    // Display result
    displayResult(bmi, category, categoryClass);
}

function displayResult(bmi, category, categoryClass) {
    // Create or update result display
    let resultDiv = document.getElementById('bmi-result');
    
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'bmi-result';
        resultDiv.className = 'mt-4 p-4 text-center text-white';
        resultDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
        resultDiv.style.borderRadius = '10px';
        
        // Insert after the form
        const form = document.querySelector('form');
        form.parentNode.insertBefore(resultDiv, form.nextSibling);
    }

    // Color coding for categories
    const colors = {
        'underweight': '#3498db',
        'normal': '#27ae60',
        'overweight': '#f39c12',
        'obese': '#e74c3c'
    };

    resultDiv.innerHTML = `
        <h3 class="text-white mb-3">Your BMI Result</h3>
        <div class="bmi-value" style="color: ${colors[categoryClass]}">
            ${bmi.toFixed(1)}
        </div>
        <div class="mt-2" style="background-color: ${colors[categoryClass]}; padding: 10px; border-radius: 5px;">
            <strong>${category}</strong>
        </div>
        <div class="mt-3 small">
            <p class="mb-1"><strong>BMI Categories:</strong></p>
            <p class="mb-0">Underweight: Below 18.5 | Normal: 18.5-24.9 | Overweight: 25-29.9 | Obese: 30+</p>
        </div>
    `;

    // Smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add event listener when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Find the calculate button and add click event
    const calculateButton = document.querySelector('input[value="Calculate Now"]');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateBMI);
    }

    // Add Enter key support for form inputs
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });
    });
});

// Optional: Clear result when inputs change
function clearResult() {
    const resultDiv = document.getElementById('bmi-result');
    if (resultDiv) {
        resultDiv.remove();
    }
}

// Add input change listeners to clear result
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', clearResult);
    });
});
