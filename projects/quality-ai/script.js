$(document).ready(function () {
    $(".datepicker").flatpickr({
        enableTime: true,
        altInput: true,
        altFormat: "d/m/Y H:i",
        dateFormat: "Y-m-d\\TH:i:S",
        time_24hr: true,
        defaultHour: 12,
        onChange: function (selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                instance.input.dataset.value = selectedDates[0].toISOString().slice(0, 19); 
            }
        }
    });

    $("#date-form").on("submit", function (e) {
        e.preventDefault();

        $("#loading").show();
        $("#graphs").hide();
        $("#graph-total").hide();
        $("#download-link").hide();

        const startDate = document.getElementById("start_date").dataset.value;
        const endDate = document.getElementById("end_date").dataset.value;
        const token = $("#token").val();
        const quantidade = $("#quantidade").val();
        const modeloIA = $('#modelo_ia').is(':checked') ? 'gemini' : 'gpt';

        $.ajax({
            url: "/analisar",
            type: "POST",
            data: {
                token: token,
                quantidade: quantidade,
                start_date: startDate,
                end_date: endDate,
                modelo_ia: modeloIA
            },
            success: function (response) {
                $("#loading").hide();
                $("#graphs").show();
                $("#graph-total").show();
                $("#download-link").attr("href", "/download/" + response.filename).show();

                Plotly.newPlot('graph-sentimento', JSON.parse(response.graph_sentimento).data, JSON.parse(response.graph_sentimento).layout);
                Plotly.newPlot('graph-resolutividade', JSON.parse(response.graph_resolutividade).data, JSON.parse(response.graph_resolutividade).layout);
                Plotly.newPlot('graph-qualidade', JSON.parse(response.graph_qualidade).data, JSON.parse(response.graph_qualidade).layout);

                $('#graph-total').html(`Total de atendimentos encontrados: <strong>${response.total_atendimentos}</strong>`);
            },
            error: function () {
                $("#loading").hide();
                $("#graph-total").show();
                $("#graphs").show();
                alert("Ocorreu um erro ao gerar os gráficos. Verifique a data informada e tente novamente.");
            }
        });
    });
});
