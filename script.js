<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora y Simulador de Amortización</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans min-h-screen">

    <!-- Header -->
    <header class="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-sky-500 rounded-lg text-white">
                    <i class="fa-solid fa-calculator text-2xl"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold leading-tight">Simulador de Amortización</h1>
                    <p class="text-xs text-slate-300">Planifica tus créditos y préstamos de forma inteligente</p>
                </div>
            </div>
            <button onclick="window.print()" class="hidden sm:flex items-center space-x-2 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg transition-colors">
                <i class="fa-solid fa-print"></i>
                <span>Imprimir / PDF</span>
            </button>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <!-- Panel de Configuración / Formulario -->
            <div class="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                    <h2 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-sliders text-sky-600"></i> Parámetros del Crédito
                    </h2>

                    <form id="calc-form" class="space-y-4">
                        <!-- Monto -->
                        <div>
                            <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">Monto del Préstamo</label>
                            <div class="relative rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span class="text-slate-500 sm:text-sm">$</span>
                                </div>
                                <input type="number" id="monto" min="100" step="100" value="10000" required
                                    class="block w-full rounded-lg border-slate-200 pl-8 pr-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm">
                            </div>
                        </div>

                        <!-- Tasa de Interés -->
                        <div>
                            <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">Tasa de Interés Anual (%)</label>
                            <div class="relative rounded-md shadow-sm">
                                <input type="number" id="tasa" min="0.1" step="0.01" value="12" required
                                    class="block w-full rounded-lg border-slate-200 pr-8 pl-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm">
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span class="text-slate-500 sm:text-sm">%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Plazo -->
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">Plazo</label>
                                <input type="number" id="plazo" min="1" step="1" value="12" required
                                    class="block w-full rounded-lg border-slate-200 px-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">Unidad</label>
                                <select id="unidad-plazo" class="block w-full rounded-lg border-slate-200 px-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm bg-white">
                                    <option value="meses" selected>Meses</option>
                                    <option value="anios">Años</option>
                                </select>
                            </div>
                        </div>

                        <!-- Frecuencia de Pago -->
                        <div>
                            <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">Frecuencia de Pago</label>
                            <select id="frecuencia" class="block w-full rounded-lg border-slate-200 px-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm bg-white">
                                <option value="12" selected>Mensual (12/año)</option>
                                <option value="24">Quincenal (24/año)</option>
                                <option value="52">Semanal (52/año)</option>
                                <option value="4">Trimestral (4/año)</option>
                                <option value="1">Anual (1/año)</option>
                            </select>
                        </div>

                        <!-- Sistema de Amortización -->
                        <div>
                            <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">Sistema de Amortización</label>
                            <select id="sistema" class="block w-full rounded-lg border-slate-200 px-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm bg-white">
                                <option value="frances" selected>Francés (Cuota Fija)</option>
                                <option value="aleman">Alemán (Amortización Fija)</option>
                            </select>
                        </div>

                        <!-- Abono Extraordinario Opcional -->
                        <div class="border-t border-slate-100 pt-3 mt-3">
                            <label class="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">
                                Abono Extra Recurrente (Opcional)
                            </label>
                            <div class="relative rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span class="text-slate-500 sm:text-sm">$</span>
                                </div>
                                <input type="number" id="abono-extra" min="0" step="10" value="0"
                                    class="block w-full rounded-lg border-slate-200 pl-8 pr-3 py-2 text-slate-900 border focus:border-sky-500 focus:ring-sky-500 text-sm"
                                    placeholder="0">
                            </div>
                            <p class="text-[10px] text-slate-400 mt-1">Suma adicional que abonarás al capital en cada cuota.</p>
                        </div>
                    </form>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-100">
                    <button type="button" id="btn-calcular" class="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2">
                        <i class="fa-solid fa-calculator"></i>
                        <span>Calcular Tabla</span>
                    </button>
                </div>
            </div>

            <!-- Panel de Resultados y Gráficos -->
            <div class="lg:col-span-8 space-y-6">

                <!-- Tarjetas Informativas / Resumen -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cuota Periódica</span>
                        <div class="mt-2 flex items-baseline justify-between">
                            <span id="res-cuota" class="text-2xl font-extrabold text-slate-900">$0.00</span>
                            <span id="res-cuota-tag" class="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">Fija</span>
                        </div>
                        <span class="text-[11px] text-slate-500 mt-1" id="lbl-frecuencia">Pago mensual</span>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total de Intereses</span>
                        <div class="mt-2">
                            <span id="res-intereses" class="text-2xl font-extrabold text-amber-600">$0.00</span>
                        </div>
                        <span class="text-[11px] text-slate-500 mt-1" id="res-interes-porcentaje">0% del préstamo</span>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Costo Total Crédito</span>
                        <div class="mt-2">
                            <span id="res-total" class="text-2xl font-extrabold text-emerald-600">$0.00</span>
                        </div>
                        <span class="text-[11px] text-slate-500 mt-1" id="res-num-pagos">0 pagos totales</span>
                    </div>
                </div>

                <!-- Gráfico de Composición de Pagos -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <h3 class="text-base font-semibold text-slate-900 flex items-center gap-2">
                            <i class="fa-solid fa-chart-line text-sky-600"></i> Proyección del Saldo y Composición
                        </h3>
                        <div class="flex items-center space-x-2 text-xs">
                            <span class="inline-flex items-center text-slate-600"><span class="w-3 h-3 bg-sky-500 rounded-full inline-block mr-1"></span> Capital</span>
                            <span class="inline-flex items-center text-slate-600"><span class="w-3 h-3 bg-amber-500 rounded-full inline-block mr-1"></span> Interés</span>
                        </div>
                    </div>
                    <div class="h-64 relative">
                        <canvas id="amortizationChart"></canvas>
                    </div>
                </div>

            </div>

        </div>

        <!-- Tabla de Amortización Detallada -->
        <div class="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-lg font-semibold text-slate-900">Tabla de Amortización Detallada</h3>
                    <p class="text-xs text-slate-500">Desglose periodo por periodo del capital, intereses y saldo pendiente.</p>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <input type="text" id="tabla-buscar" placeholder="Buscar periodo..." class="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500">
                        <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-2 text-slate-400 text-xs"></i>
                    </div>
                    <button id="btn-exportar" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5">
                        <i class="fa-solid fa-file-excel"></i>
                        <span>Exportar CSV</span>
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table class="w-full text-left border-collapse" id="tabla-amortizacion">
                    <thead class="bg-slate-50 sticky top-0 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                        <tr>
                            <th class="py-3 px-4"># Periodo</th>
                            <th class="py-3 px-4">Cuota Total</th>
                            <th class="py-3 px-4">Interés</th>
                            <th class="py-3 px-4">Capital (Amort.)</th>
                            <th class="py-3 px-4">Abono Extra</th>
                            <th class="py-3 px-4">Saldo Pendiente</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm text-slate-700" id="tabla-body">
                        <!-- Filas dinámicas -->
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="mt-12 bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>Calculadora de Amortización Financiera &copy; 2026. Herramienta de libre uso con fines informativos.</p>
    </footer>

    <!-- Lógica de la Aplicación -->
    <script>
        let myChart = null;

        // Formateador de moneda
        const formatMoney = (val) => {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(val);
        };

        // Función principal de cálculo
        function calcularAmortizacion() {
            // Obtención de valores
            const monto = parseFloat(document.getElementById('monto').value) || 0;
            const tasaAnual = parseFloat(document.getElementById('tasa').value) || 0;
            let plazo = parseInt(document.getElementById('plazo').value) || 0;
            const unidadPlazo = document.getElementById('unidad-plazo').value;
            const pagosPorAnio = parseInt(document.getElementById('frecuencia').value) || 12;
            const sistema = document.getElementById('sistema').value;
            const abonoExtra = parseFloat(document.getElementById('abono-extra').value) || 0;

            if (monto <= 0 || tasaAnual <= 0 || plazo <= 0) {
                return;
            }

            // Normalización de plazo a número total de pagos
            let totalPagos = (unidadPlazo === 'anios') ? plazo * pagosPorAnio : Math.ceil((plazo / 12) * pagosPorAnio);
            const tasaPeriodica = (tasaAnual / 100) / pagosPorAnio;

            let tablaData = [];
            let saldo = monto;
            let totalInteres = 0;
            let totalPagado = 0;

            // Etiquetas del gráfico
            let labels = [0];
            let saldosData = [monto];
            let capitalAcumuladoData = [0];
            let interesAcumuladoData = [0];

            let cuotaEstimada = 0;

            if (sistema === 'frances') {
                // Cuota Fija (Francés)
                // PMT = P * [i(1+i)^n] / [(1+i)^n - 1]
                cuotaEstimada = monto * (tasaPeriodica * Math.pow(1 + tasaPeriodica, totalPagos)) / (Math.pow(1 + tasaPeriodica, totalPagos) - 1);
            } else {
                // Sistema Alemán: Amortización de capital constante
                const amortizacionConstante = monto / totalPagos;
                cuotaEstimada = amortizacionConstante + (monto * tasaPeriodica); // Primera cuota (la más alta)
            }

            let acumuladoCapital = 0;
            let acumuladoInteres = 0;

            for (let i = 1; i <= totalPagos; i++) {
                if (saldo <= 0.01) break;

                let interesPeriodo = saldo * tasaPeriodica;
                let capitalPeriodo = 0;
                let cuotaPeriodo = 0;

                if (sistema === 'frances') {
                    cuotaPeriodo = cuotaEstimada;
                    capitalPeriodo = cuotaPeriodo - interesPeriodo;
                } else {
                    // Alemán
                    capitalPeriodo = monto / totalPagos;
                    cuotaPeriodo = capitalPeriodo + interesPeriodo;
                }

                // Aplicar abono extra si existe
                let extraAplicado = Math.min(abonoExtra, saldo - capitalPeriodo);
                if (extraAplicado < 0) extraAplicado = 0;

                let capitalTotalPeriodo = capitalPeriodo + extraAplicado;

                // Ajuste para el último periodo si sobrepasa
                if (capitalTotalPeriodo > saldo) {
                    capitalTotalPeriodo = saldo;
                    capitalPeriodo = Math.max(0, saldo - extraAplicado);
                    cuotaPeriodo = capitalPeriodo + interesPeriodo;
                }

                saldo -= capitalTotalPeriodo;
                if (saldo < 0) saldo = 0;

                totalInteres += interesPeriodo;
                totalPagado += (cuotaPeriodo + extraAplicado);

                acumuladoCapital += capitalTotalPeriodo;
                acumuladoInteres += interesPeriodo;

                tablaData.push({
                    periodo: i,
                    cuota: cuotaPeriodo,
                    interes: interesPeriodo,
                    capital: capitalPeriodo,
                    extra: extraAplicado,
                    saldo: saldo
                });

                labels.push(i);
                saldosData.push(saldo);
                capitalAcumuladoData.push(acumuladoCapital);
                interesAcumuladoData.push(acumuladoInteres);
            }

            // Actualizar Tarjetas de Resumen
            document.getElementById('res-cuota').innerText = (sistema === 'frances') ? formatMoney(cuotaEstimada) : `Var. desde ${formatMoney(cuotaEstimada)}`;
            document.getElementById('res-cuota-tag').innerText = (sistema === 'frances') ? 'Cuota Fija' : 'Cuota Variable';
            document.getElementById('res-intereses').innerText = formatMoney(totalInteres);
            document.getElementById('res-total').innerText = formatMoney(totalPagado);
            
            const pctInteres = ((totalInteres / monto) * 100).toFixed(1);
            document.getElementById('res-interes-porcentaje').innerText = `${pctInteres}% del valor prestado`;
            document.getElementById('res-num-pagos').innerText = `${tablaData.length} cuotas programadas`;

            // Renderizar Tabla
            renderTabla(tablaData);

            // Renderizar / Actualizar Gráfico
            renderGrafico(labels, saldosData, capitalAcumuladoData, interesAcumuladoData);
        }

        // Renderizar filas de la tabla
        function renderTabla(data) {
            const tbody = document.getElementById('tabla-body');
            tbody.innerHTML = '';

            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-50 transition-colors border-b border-slate-100";
                tr.innerHTML = `
                    <td class="py-3 px-4 font-medium text-slate-900">${row.periodo}</td>
                    <td class="py-3 px-4 font-semibold text-slate-800">${formatMoney(row.cuota + row.extra)}</td>
                    <td class="py-3 px-4 text-amber-600">${formatMoney(row.interes)}</td>
                    <td class="py-3 px-4 text-sky-600">${formatMoney(row.capital)}</td>
                    <td class="py-3 px-4 text-emerald-600 font-medium">${row.extra > 0 ? formatMoney(row.extra) : '-'}</td>
                    <td class="py-3 px-4 font-medium text-slate-700">${formatMoney(row.saldo)}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Configuración y renderizado de Chart.js
        function renderGrafico(labels, saldos, capital, interes) {
            const ctx = document.getElementById('amortizationChart').getContext('2d');

            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Saldo Pendiente',
                            data: saldos,
                            borderColor: '#0284c7',
                            backgroundColor: 'rgba(2, 132, 199, 0.1)',
                            fill: true,
                            tension: 0.3,
                            borderWidth: 2,
                            pointRadius: labels.length > 50 ? 0 : 3
                        },
                        {
                            label: 'Interés Acumulado',
                            data: interes,
                            borderColor: '#d97706',
                            backgroundColor: 'transparent',
                            borderDash: [5, 5],
                            borderWidth: 2,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) label += ': ';
                                    if (context.parsed.y !== null) {
                                        label += formatMoney(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            title: { display: true, text: 'Periodo de Pago', font: { size: 10 } }
                        },
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value >= 1000 ? (value/1000) + 'k' : value);
                                }
                            }
                        }
                    }
                }
            });
        }

        // Exportar tabla a CSV
        function exportarCSV() {
            const table = document.getElementById('tabla-amortizacion');
            let csv = [];
            const rows = table.querySelectorAll('tr');

            for (let i = 0; i < rows.length; i++) {
                const row = [], cols = rows[i].querySelectorAll('th, td');
                for (let j = 0; j < cols.length; j++) {
                    // Limpiar comas y formato para CSV limpio
                    let text = cols[j].innerText.replace('$', '').replace(/,/g, '');
                    row.push('"' + text.trim() + '"');
                }
                csv.push(row.join(','));
            }

            const csvFile = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
            const downloadLink = document.createElement('a');
            downloadLink.download = 'Tabla_Amortizacion.csv';
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }

        // Filtrado rápido en la tabla
        document.getElementById('tabla-buscar').addEventListener('keyup', function(e) {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#tabla-body tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });

        // Listeners de eventos para recálculo automático
        document.getElementById('btn-calcular').addEventListener('click', calcularAmortizacion);
        document.getElementById('btn-exportar').addEventListener('click', exportarCSV);

        // Recálculo interactivo al cambiar campos
        const inputs = document.querySelectorAll('#calc-form input, #calc-form select');
        inputs.forEach(input => {
            input.addEventListener('change', calcularAmortizacion);
        });

        // Inicializar al cargar
        window.onload = function() {
            calcularAmortizacion();
        };
    </script>
</body>
</html>