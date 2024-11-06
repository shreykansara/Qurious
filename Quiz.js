function toggleOpt() {
    const questType = document.getElementById('qstntype').value;
    if (questType === 'tf') {
        document.getElementById('tfblock').style.display = "block";
        document.getElementById('mcqblock').style.display = "none";
    }
    if (questType === "mcq") {
        document.getElementById('tfblock').style.display = "none";
        document.getElementById('mcqblock').style.display = "block";
    }
}