// ===== Mobile Menu Toggle =====
(function () {
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("mobileMenu");
  const iconMenu = toggle.querySelector(".icon-menu");
  const iconClose = toggle.querySelector(".icon-close");

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.contains("active");
    menu.classList.toggle("active");
    iconMenu.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
    toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  });

  // Close menu when a link is clicked
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
      iconMenu.classList.remove("hidden");
      iconClose.classList.add("hidden");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
})();

// ===== 3-Step Verification Demo =====
(function () {
  var currentStep = 1;
  var verified = false;

  var stepCircle1 = document.getElementById("stepCircle1");
  var stepCircle2 = document.getElementById("stepCircle2");
  var stepCircle3 = document.getElementById("stepCircle3");
  var stepLine1 = document.getElementById("stepLine1");
  var stepLine2 = document.getElementById("stepLine2");

  var step1 = document.getElementById("verifyStep1");
  var step2 = document.getElementById("verifyStep2");
  var step3 = document.getElementById("verifyStep3");
  var success = document.getElementById("verifySuccess");

  var voterIdInput = document.getElementById("voterIdInput");
  var voterIdError = document.getElementById("voterIdError");
  var otpInput = document.getElementById("otpInput");
  var otpError = document.getElementById("otpError");

  var checkSvg =
    '<svg class="check-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';

  function updateIndicators() {
    // Step circles
    stepCircle1.className =
      "step-circle" + (currentStep >= 1 ? " active" : "");
    stepCircle2.className =
      "step-circle" + (currentStep >= 2 ? " active" : "");
    stepCircle3.className =
      "step-circle" + (currentStep >= 3 ? " active" : "");

    // Lines
    stepLine1.className = "step-line" + (currentStep > 1 ? " active" : "");
    stepLine2.className = "step-line" + (currentStep > 2 ? " active" : "");

    // Show check marks when verified
    if (verified) {
      stepCircle1.innerHTML = checkSvg;
      stepCircle2.innerHTML = checkSvg;
      stepCircle3.innerHTML = checkSvg;
    } else {
      stepCircle1.textContent = "1";
      stepCircle2.textContent = "2";
      stepCircle3.textContent = "3";
    }
  }

  function showStep(step) {
    step1.classList.add("hidden");
    step2.classList.add("hidden");
    step3.classList.add("hidden");
    success.classList.add("hidden");

    if (verified) {
      success.classList.remove("hidden");
    } else if (step === 1) {
      step1.classList.remove("hidden");
    } else if (step === 2) {
      step2.classList.remove("hidden");
    } else if (step === 3) {
      step3.classList.remove("hidden");
    }
  }

  // Step 1: Verify Voter ID
  document
    .getElementById("verifyIdBtn")
    .addEventListener("click", function () {
      var val = voterIdInput.value.trim();
      if (val.length < 6) {
        voterIdError.classList.remove("hidden");
        return;
      }
      voterIdError.classList.add("hidden");
      currentStep = 2;
      updateIndicators();
      showStep(2);
    });

  // Step 2: Verify OTP
  document
    .getElementById("verifyOtpBtn")
    .addEventListener("click", function () {
      var val = otpInput.value.trim();
      if (val.length !== 6) {
        otpError.classList.remove("hidden");
        return;
      }
      otpError.classList.add("hidden");
      currentStep = 3;
      updateIndicators();
      showStep(3);
    });

  // OTP input: digits only
  otpInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });

  // Step 3: Simulate Face Verification
  document
    .getElementById("verifyFaceBtn")
    .addEventListener("click", function () {
      verified = true;
      updateIndicators();
      showStep(0);
    });

  // Reset
  document
    .getElementById("verifyResetBtn")
    .addEventListener("click", function () {
      currentStep = 1;
      verified = false;
      voterIdInput.value = "";
      otpInput.value = "";
      voterIdError.classList.add("hidden");
      otpError.classList.add("hidden");
      updateIndicators();
      showStep(1);
    });
})();

// ===== Shared Election Data (globally accessible for voting + results) =====
var ElectionData = (function () {
  // TVK dominates Tamil Nadu with ~90% (35 of 39 seats)
  var parties = [
    { name: "TVK", dot: "tvk-dot", won: 33, leading: 2, alliance: "tvk" },
    { name: "BJP", dot: "nda-dot", won: 180, leading: 38, alliance: "nda" },
    { name: "INC", dot: "india-dot", won: 68, leading: 22, alliance: "india" },
    { name: "SP", dot: "india-dot", won: 28, leading: 9, alliance: "india" },
    { name: "TMC", dot: "india-dot", won: 22, leading: 7, alliance: "india" },
    { name: "DMK", dot: "india-dot", won: 2, leading: 0, alliance: "india" },
    { name: "TDP", dot: "nda-dot", won: 14, leading: 2, alliance: "nda" },
    { name: "JD(U)", dot: "nda-dot", won: 11, leading: 1, alliance: "nda" },
    { name: "BSP", dot: "bsp-dot", won: 4, leading: 2, alliance: "others" },
    { name: "AAP", dot: "aap-dot", won: 3, leading: 1, alliance: "others" },
    { name: "Others", dot: "others-dot", won: 33, leading: 10, alliance: "others" },
  ];

  var states = [
    { name: "Uttar Pradesh", seats: 80, nda: 42, india: 31, others: 7, tvk: 0 },
    { name: "Maharashtra", seats: 48, nda: 24, india: 18, others: 6, tvk: 0 },
    { name: "West Bengal", seats: 42, nda: 12, india: 27, others: 3, tvk: 0 },
    { name: "Tamil Nadu", seats: 39, nda: 1, india: 2, others: 1, tvk: 35 },
    { name: "Bihar", seats: 40, nda: 25, india: 12, others: 3, tvk: 0 },
    { name: "Karnataka", seats: 28, nda: 17, india: 10, others: 1, tvk: 0 },
    { name: "Madhya Pradesh", seats: 29, nda: 24, india: 4, others: 1, tvk: 0 },
    { name: "Rajasthan", seats: 25, nda: 18, india: 6, others: 1, tvk: 0 },
    { name: "Gujarat", seats: 26, nda: 24, india: 1, others: 1, tvk: 0 },
    { name: "Andhra Pradesh", seats: 25, nda: 18, india: 5, others: 2, tvk: 0 },
    { name: "Odisha", seats: 21, nda: 14, india: 5, others: 2, tvk: 0 },
    { name: "Kerala", seats: 20, nda: 1, india: 18, others: 1, tvk: 0 },
  ];

  var targetVotes = 42_67_38_291;
  var turnoutTarget = 67.4;
  var userVoteCount = 0;

  function getAllianceTotal(allianceKey) {
    return parties.reduce(function (sum, p) {
      return p.alliance === allianceKey ? sum + p.won + p.leading : sum;
    }, 0);
  }

  function getTotalSeats() {
    return parties.reduce(function (s, p) { return s + p.won + p.leading; }, 0);
  }

  function getTotalDeclared() {
    return parties.reduce(function (s, p) { return s + p.won; }, 0);
  }

  return {
    parties: parties,
    states: states,
    targetVotes: targetVotes,
    turnoutTarget: turnoutTarget,
    userVoteCount: userVoteCount,
    getAllianceTotal: getAllianceTotal,
    getTotalSeats: getTotalSeats,
    getTotalDeclared: getTotalDeclared,
  };
})();

// ===== Cast Your Vote Section =====
(function () {
  var stateSelect = document.getElementById("voteState");
  var constituencyGroup = document.getElementById("constituencyGroup");
  var constituencySelect = document.getElementById("voteConstituency");
  var partySelectionDiv = document.getElementById("partySelection");
  var partyOptionsDiv = document.getElementById("partyOptions");
  var castVoteBtn = document.getElementById("castVoteBtn");
  var voteError = document.getElementById("voteError");
  var voteFormCard = document.getElementById("voteFormCard");
  var voteSuccessCard = document.getElementById("voteSuccessCard");
  var voteSuccessMsg = document.getElementById("voteSuccessMsg");
  var voteFeed = document.getElementById("voteFeed");

  var selectedParty = null;

  // Constituencies per state (sample)
  var constituencies = {
    "Tamil Nadu": [
      "Chennai North", "Chennai South", "Chennai Central", "Coimbatore", "Madurai",
      "Tiruchirappalli", "Salem", "Tirunelveli", "Thoothukudi", "Vellore",
      "Villupuram", "Cuddalore", "Kancheepuram", "Sivaganga", "Dindigul",
      "Thanjavur", "Nagapattinam", "Mayiladuthurai", "Perambalur", "Karur",
      "Dharmapuri", "Krishnagiri", "Tiruvannamalai", "Arani", "Kallakurichi",
      "Nilgiris", "Erode", "Tiruppur", "Pollachi", "Namakkal",
      "Ramanathapuram", "Theni", "Virudhunagar", "Tenkasi", "Kanniyakumari",
      "Sriperumbudur", "Arakkonam", "Ranipet", "Chidambaram"
    ],
    "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur", "Agra", "Allahabad", "Meerut", "Ghaziabad", "Noida", "Mathura", "Gorakhpur"],
    "Maharashtra": ["Mumbai North", "Mumbai South", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Sangli"],
    "West Bengal": ["Kolkata North", "Kolkata South", "Howrah", "Asansol", "Durgapur", "Siliguri", "Barrackpore", "Jadavpur", "Hooghly", "Medinipur"],
    "Bihar": ["Patna Sahib", "Muzaffarpur", "Gaya", "Bhagalpur", "Darbhanga", "Purnia", "Begusarai", "Sasaram", "Arrah", "Chapra"],
    "Karnataka": ["Bangalore North", "Bangalore South", "Mysore", "Mangalore", "Hubli-Dharwad", "Belgaum", "Shimoga", "Udupi", "Hassan", "Tumkur"],
    "Kerala": ["Thiruvananthapuram", "Ernakulam", "Kozhikode", "Thrissur", "Kannur", "Palakkad", "Kollam", "Alappuzha", "Kottayam", "Malappuram"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Bharatpur", "Alwar", "Sikar", "Chittorgarh"],
    "Gujarat": ["Ahmedabad East", "Ahmedabad West", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar", "Bhavnagar", "Junagadh", "Anand"],
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Tirupati", "Nellore", "Rajahmundry", "Kakinada", "Kurnool", "Anantapur", "Kadapa"],
  };

  // Parties per state
  var stateParties = {
    "Tamil Nadu": [
      { id: "tvk", name: "TVK", full: "Tamilaga Vettri Kazhagam", symbol: "T", dot: "tvk-dot" },
      { id: "dmk", name: "DMK", full: "Dravida Munnetra Kazhagam", symbol: "D", dot: "india-dot" },
      { id: "aiadmk", name: "AIADMK", full: "All India Anna DMK", symbol: "A", dot: "nda-dot" },
      { id: "bjp", name: "BJP", full: "Bharatiya Janata Party", symbol: "B", dot: "nda-dot" },
      { id: "inc", name: "INC", full: "Indian National Congress", symbol: "C", dot: "india-dot" },
      { id: "nota", name: "NOTA", full: "None of the Above", symbol: "N", dot: "others-dot" },
    ],
    "default": [
      { id: "bjp", name: "BJP", full: "Bharatiya Janata Party", symbol: "B", dot: "nda-dot" },
      { id: "inc", name: "INC", full: "Indian National Congress", symbol: "C", dot: "india-dot" },
      { id: "aap", name: "AAP", full: "Aam Aadmi Party", symbol: "A", dot: "aap-dot" },
      { id: "bsp", name: "BSP", full: "Bahujan Samaj Party", symbol: "S", dot: "bsp-dot" },
      { id: "nota", name: "NOTA", full: "None of the Above", symbol: "N", dot: "others-dot" },
    ],
  };

  // State-specific party lists
  stateParties["Uttar Pradesh"] = [
    { id: "bjp", name: "BJP", full: "Bharatiya Janata Party", symbol: "B", dot: "nda-dot" },
    { id: "sp", name: "SP", full: "Samajwadi Party", symbol: "S", dot: "india-dot" },
    { id: "inc", name: "INC", full: "Indian National Congress", symbol: "C", dot: "india-dot" },
    { id: "bsp", name: "BSP", full: "Bahujan Samaj Party", symbol: "S", dot: "bsp-dot" },
    { id: "nota", name: "NOTA", full: "None of the Above", symbol: "N", dot: "others-dot" },
  ];
  stateParties["West Bengal"] = [
    { id: "tmc", name: "TMC", full: "Trinamool Congress", symbol: "T", dot: "india-dot" },
    { id: "bjp", name: "BJP", full: "Bharatiya Janata Party", symbol: "B", dot: "nda-dot" },
    { id: "inc", name: "INC", full: "Indian National Congress", symbol: "C", dot: "india-dot" },
    { id: "nota", name: "NOTA", full: "None of the Above", symbol: "N", dot: "others-dot" },
  ];

  function getParties(state) {
    return stateParties[state] || stateParties["default"];
  }

  // State change handler
  stateSelect.addEventListener("change", function () {
    var state = this.value;
    selectedParty = null;
    castVoteBtn.disabled = true;
    voteError.classList.add("hidden");

    if (!state) {
      constituencyGroup.classList.add("hidden");
      partySelectionDiv.classList.add("hidden");
      castVoteBtn.classList.add("hidden");
      return;
    }

    // Populate constituencies
    var consts = constituencies[state] || ["Constituency 1", "Constituency 2", "Constituency 3"];
    constituencySelect.innerHTML = '<option value="">-- Choose a Constituency --</option>';
    consts.forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      constituencySelect.appendChild(opt);
    });
    constituencyGroup.classList.remove("hidden");
    partySelectionDiv.classList.add("hidden");
    castVoteBtn.classList.add("hidden");
  });

  // Constituency change handler
  constituencySelect.addEventListener("change", function () {
    selectedParty = null;
    castVoteBtn.disabled = true;
    voteError.classList.add("hidden");

    if (!this.value) {
      partySelectionDiv.classList.add("hidden");
      castVoteBtn.classList.add("hidden");
      return;
    }

    // Show party options
    var state = stateSelect.value;
    var pList = getParties(state);
    partyOptionsDiv.innerHTML = "";
    pList.forEach(function (p) {
      var div = document.createElement("div");
      div.className = "party-option";
      div.dataset.partyId = p.id;
      div.innerHTML =
        '<span class="party-option-dot"></span>' +
        '<div class="party-option-info">' +
        '<div class="party-option-name">' + p.name + '</div>' +
        '<div class="party-option-full">' + p.full + '</div>' +
        '</div>' +
        '<div class="party-option-symbol">' + p.symbol + '</div>';
      div.addEventListener("click", function () {
        document.querySelectorAll(".party-option").forEach(function (el) {
          el.classList.remove("selected");
        });
        div.classList.add("selected");
        selectedParty = p;
        castVoteBtn.disabled = false;
        voteError.classList.add("hidden");
      });
      partyOptionsDiv.appendChild(div);
    });

    partySelectionDiv.classList.remove("hidden");
    castVoteBtn.classList.remove("hidden");
  });

  // Cast vote
  castVoteBtn.addEventListener("click", function () {
    if (!stateSelect.value || !constituencySelect.value || !selectedParty) {
      voteError.classList.remove("hidden");
      return;
    }
    voteError.classList.add("hidden");

    var stateName = stateSelect.value;
    var constName = constituencySelect.value;
    var partyName = selectedParty.name;

    // Update ElectionData
    var partyMatch = null;
    ElectionData.parties.forEach(function (p) {
      if (p.name === partyName) partyMatch = p;
    });
    // Map smaller/local parties to closest
    if (!partyMatch) {
      if (partyName === "AIADMK") {
        ElectionData.parties.forEach(function (p) { if (p.name === "Others") partyMatch = p; });
      } else if (partyName === "NOTA") {
        partyMatch = null; // NOTA doesn't add to any party
      }
    }

    if (partyMatch) {
      partyMatch.leading += 1;
    }

    ElectionData.userVoteCount += 1;
    ElectionData.targetVotes += 1;

    // Update the state data
    ElectionData.states.forEach(function (s) {
      if (s.name === stateName) {
        if (partyName === "TVK") s.tvk = (s.tvk || 0) + 1;
        else if (["BJP", "TDP", "JD(U)", "AIADMK"].indexOf(partyName) >= 0) s.nda += 1;
        else if (["INC", "SP", "TMC", "DMK", "AAP"].indexOf(partyName) >= 0) s.india += 1;
        else if (partyName !== "NOTA") s.others += 1;
      }
    });

    // Show success
    voteFormCard.classList.add("hidden");
    voteSuccessCard.classList.remove("hidden");
    voteSuccessMsg.textContent =
      "You voted for " + partyName + " in " + constName + ", " + stateName + ". Check the Live Results section below!";

    // Add to feed
    addToFeed(partyName, constName, stateName);

    // Refresh results display
    if (typeof ResultsRenderer !== "undefined") {
      ResultsRenderer.refresh();
    }
  });

  // Vote again
  document.getElementById("voteAgainBtn").addEventListener("click", function () {
    voteSuccessCard.classList.add("hidden");
    voteFormCard.classList.remove("hidden");
    stateSelect.value = "";
    constituencyGroup.classList.add("hidden");
    partySelectionDiv.classList.add("hidden");
    castVoteBtn.classList.add("hidden");
    castVoteBtn.disabled = true;
    selectedParty = null;
  });

  // Feed helper
  var feedItems = [];
  var randomNames = [
    "Arjun", "Priya", "Karthik", "Divya", "Ravi", "Meena", "Surya", "Ananya",
    "Vijay", "Lakshmi", "Rahul", "Deepa", "Arun", "Kavitha", "Senthil", "Nithya"
  ];

  function addToFeed(partyName, constName, stateName) {
    var emptyMsg = voteFeed.querySelector(".vote-feed-empty");
    if (emptyMsg) emptyMsg.remove();

    var name = randomNames[Math.floor(Math.random() * randomNames.length)];
    var now = new Date();
    var time = now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0") + ":" +
               now.getSeconds().toString().padStart(2, "0");
    var initials = name.charAt(0);

    var item = document.createElement("div");
    item.className = "vote-feed-item";
    item.innerHTML =
      '<div class="feed-avatar">' + initials + '</div>' +
      '<div class="feed-text"><strong>' + name + '</strong> voted for <strong>' + partyName +
      '</strong> in ' + constName + '</div>' +
      '<span class="feed-time">' + time + '</span>';

    voteFeed.insertBefore(item, voteFeed.firstChild);

    // Keep max 20 items
    while (voteFeed.children.length > 20) {
      voteFeed.removeChild(voteFeed.lastChild);
    }
  }
})();

// ===== Live Election Results =====
var ResultsRenderer = (function () {
  var maxSeats = 543;

  function animateCount(el, target, duration, suffix) {
    suffix = suffix || "";
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent =
        typeof target === "number" && target > 9999
          ? current.toLocaleString("en-IN") + suffix
          : current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent =
          typeof target === "number" && target > 9999
            ? target.toLocaleString("en-IN") + suffix
            : target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  function renderTable() {
    var tbody = document.getElementById("partyTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    // Sort by total descending
    var sorted = ElectionData.parties.slice().sort(function (a, b) {
      return (b.won + b.leading) - (a.won + a.leading);
    });
    sorted.forEach(function (p) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td><div class="party-cell"><span class="party-dot ' + p.dot + '"></span>' + p.name + '</div></td>' +
        '<td>' + p.won + '</td>' +
        '<td>' + p.leading + '</td>' +
        '<td class="total-cell">' + (p.won + p.leading) + '</td>';
      tbody.appendChild(tr);
    });
  }

  function renderStates() {
    var statesGrid = document.getElementById("statesGrid");
    if (!statesGrid) return;
    statesGrid.innerHTML = "";
    ElectionData.states.forEach(function (s) {
      var total = s.nda + s.india + s.others + (s.tvk || 0);
      if (total === 0) total = 1;
      var ndaPct = ((s.nda / total) * 100).toFixed(1);
      var indiaPct = ((s.india / total) * 100).toFixed(1);
      var tvkPct = (((s.tvk || 0) / total) * 100).toFixed(1);
      var othersPct = ((s.others / total) * 100).toFixed(1);

      var card = document.createElement("div");
      card.className = "state-card";
      var legendHtml =
        '<span class="state-legend-item"><span class="state-legend-dot" style="background:hsl(24,95%,53%)"></span>NDA ' + s.nda + '</span>' +
        '<span class="state-legend-item"><span class="state-legend-dot" style="background:hsl(210,70%,50%)"></span>INDIA ' + s.india + '</span>';
      if (s.tvk > 0) {
        legendHtml += '<span class="state-legend-item"><span class="state-legend-dot" style="background:hsl(340,75%,50%)"></span>TVK ' + s.tvk + '</span>';
      }
      legendHtml += '<span class="state-legend-item"><span class="state-legend-dot" style="background:hsl(145,55%,43%)"></span>Others ' + s.others + '</span>';

      var barsHtml =
        '<div class="state-bar-segment state-bar-nda" style="width:' + ndaPct + '%"></div>' +
        '<div class="state-bar-segment state-bar-india" style="width:' + indiaPct + '%"></div>';
      if (s.tvk > 0) {
        barsHtml += '<div class="state-bar-segment state-bar-tvk" style="width:' + tvkPct + '%"></div>';
      }
      barsHtml += '<div class="state-bar-segment state-bar-others" style="width:' + othersPct + '%"></div>';

      card.innerHTML =
        '<div class="state-card-header"><span class="state-name">' + s.name +
        '</span><span class="state-seats">' + total + ' / ' + s.seats + ' seats</span></div>' +
        '<div class="state-bar-container">' + barsHtml + '</div>' +
        '<div class="state-legend">' + legendHtml + '</div>';
      statesGrid.appendChild(card);
    });
  }

  function renderBars() {
    var ndaTotal = ElectionData.getAllianceTotal("nda");
    var indiaTotal = ElectionData.getAllianceTotal("india");
    var tvkTotal = ElectionData.getAllianceTotal("tvk");
    var totalSeats = ElectionData.getTotalSeats();
    var othersTotal = totalSeats - ndaTotal - indiaTotal - tvkTotal;

    var barNDA = document.getElementById("barNDA");
    var barINDIA = document.getElementById("barINDIA");
    var barOthers = document.getElementById("barOthers");
    var barTVK = document.getElementById("barTVK");
    var countNDA = document.getElementById("countNDA");
    var countINDIA = document.getElementById("countINDIA");
    var countOthers = document.getElementById("countOthers");
    var countTVK = document.getElementById("countTVK");

    if (barNDA) barNDA.style.width = ((ndaTotal / maxSeats) * 100).toFixed(1) + "%";
    if (barINDIA) barINDIA.style.width = ((indiaTotal / maxSeats) * 100).toFixed(1) + "%";
    if (barTVK) barTVK.style.width = ((tvkTotal / maxSeats) * 100).toFixed(1) + "%";
    if (barOthers) barOthers.style.width = ((othersTotal / maxSeats) * 100).toFixed(1) + "%";

    if (countNDA) animateCount(countNDA, ndaTotal, 800);
    if (countINDIA) animateCount(countINDIA, indiaTotal, 800);
    if (countTVK) animateCount(countTVK, tvkTotal, 800);
    if (countOthers) animateCount(countOthers, othersTotal, 800);
  }

  function renderStats() {
    var totalVotesEl = document.getElementById("totalVotesCount");
    var turnoutEl = document.getElementById("turnoutPercent");
    var constEl = document.getElementById("constituenciesCount");
    var timeEl = document.getElementById("lastUpdatedTime");

    if (totalVotesEl) animateCount(totalVotesEl, ElectionData.targetVotes, 1500);
    if (turnoutEl) {
      var startTime = null;
      var target = ElectionData.turnoutTarget;
      function stepTurnout(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / 1500, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        turnoutEl.textContent = (eased * target).toFixed(1) + "%";
        if (progress < 1) requestAnimationFrame(stepTurnout);
        else turnoutEl.textContent = target.toFixed(1) + "%";
      }
      requestAnimationFrame(stepTurnout);
    }
    if (constEl) animateCount(constEl, ElectionData.getTotalDeclared(), 1200, " / 543");
    if (timeEl) {
      var now = new Date();
      timeEl.textContent =
        now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0");
    }
  }

  function fullRender() {
    renderStats();
    renderBars();
    renderTable();
    renderStates();
  }

  function refresh() {
    renderBars();
    renderTable();
    renderStates();
    // Update time
    var timeEl = document.getElementById("lastUpdatedTime");
    if (timeEl) {
      var now = new Date();
      timeEl.textContent =
        now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0");
    }
    // Update total votes count instantly
    var totalVotesEl = document.getElementById("totalVotesCount");
    if (totalVotesEl) totalVotesEl.textContent = ElectionData.targetVotes.toLocaleString("en-IN");
  }

  // Use IntersectionObserver for scroll-triggered animation
  var resultsSection = document.getElementById("results");
  var hasAnimated = false;

  if (resultsSection && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            fullRender();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(resultsSection);
  } else if (resultsSection) {
    fullRender();
  }

  return { refresh: refresh, fullRender: fullRender };
})();

// ===== Voter ID Apply Form =====
(function () {
  var form = document.getElementById("voterApplyForm");
  var formCard = document.getElementById("applyForm");
  var successCard = document.getElementById("applySuccess");

  var fields = {
    fullName: { el: document.getElementById("fullName"), error: document.getElementById("fullNameError") },
    dob: { el: document.getElementById("dob"), error: document.getElementById("dobError") },
    gender: { el: document.getElementById("gender"), error: document.getElementById("genderError") },
    address: { el: document.getElementById("address"), error: document.getElementById("addressError") },
    state: { el: document.getElementById("state"), error: document.getElementById("stateError") },
    pincode: { el: document.getElementById("pincode"), error: document.getElementById("pincodeError") },
  };

  // Pincode: digits only
  fields.pincode.el.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });

  function validate() {
    var valid = true;

    // Full Name
    if (!fields.fullName.el.value.trim()) {
      fields.fullName.error.textContent = "Full name is required.";
      fields.fullName.error.classList.remove("hidden");
      valid = false;
    } else {
      fields.fullName.error.classList.add("hidden");
    }

    // DOB
    if (!fields.dob.el.value) {
      fields.dob.error.textContent = "Date of birth is required.";
      fields.dob.error.classList.remove("hidden");
      valid = false;
    } else {
      fields.dob.error.classList.add("hidden");
    }

    // Gender
    if (!fields.gender.el.value) {
      fields.gender.error.textContent = "Please select a gender.";
      fields.gender.error.classList.remove("hidden");
      valid = false;
    } else {
      fields.gender.error.classList.add("hidden");
    }

    // Address
    if (!fields.address.el.value.trim()) {
      fields.address.error.textContent = "Address is required.";
      fields.address.error.classList.remove("hidden");
      valid = false;
    } else {
      fields.address.error.classList.add("hidden");
    }

    // State
    if (!fields.state.el.value.trim()) {
      fields.state.error.textContent = "State is required.";
      fields.state.error.classList.remove("hidden");
      valid = false;
    } else {
      fields.state.error.classList.add("hidden");
    }

    // Pincode
    if (!fields.pincode.el.value || fields.pincode.el.value.length !== 6) {
      fields.pincode.error.textContent = "Enter a valid 6-digit pincode.";
      fields.pincode.error.classList.remove("hidden");
      valid = false;
    } else {
      fields.pincode.error.classList.add("hidden");
    }

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validate()) {
      formCard.classList.add("hidden");
      successCard.classList.remove("hidden");
    }
  });

  // Reset
  document
    .getElementById("applyResetBtn")
    .addEventListener("click", function () {
      form.reset();
      Object.keys(fields).forEach(function (key) {
        fields[key].error.classList.add("hidden");
      });
      successCard.classList.add("hidden");
      formCard.classList.remove("hidden");
    });
})();
