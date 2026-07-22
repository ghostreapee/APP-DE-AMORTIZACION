import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Percent, 
  TrendingDown, 
  Download, 
  Plus, 
  Trash2, 
  BarChart2, 
  PieChart, 
  FileText, 
  HelpCircle,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // --- Estados Principales ---
  const [monto, setMonto] = useState(100000);
  const [tasaAnual, setTasaAnual] = useState(12);
  const [plazoValor, setPlazoValor] = useState(5);
  const [plazoUnidad, setPlazoUnidad] = useState('años'); // 'años' o 'meses'
  const [frecuencia, setFrecuencia] = useState(12); // 12=Mensual, 24=Quincenal, 52=Semanal, 1=Anual
  const [sistema, setSistema] = useState('frances'); // 'frances' o 'aleman'
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);

  // Pagos extraordinarios: array de { periodo: number, monto: number }
  const [pagosExtra, setPagosExtra] = useState([]);
  const [nuevoExtraPeriodo, setNuevoExtraPeriodo] = useState('');
  const [nuevoExtraMonto, setNuevoExtraMonto] = useState('');

  // Control de vista
  const [pestanaActiva, setPestanaActiva] = useState('resumen'); // 'resumen', 'tabla', 'graficos'

  // --- Cálculos de Conversión ---
  const numeroPeriodosTotales = useMemo(() => {
    const periodosPorAno = Number(frecuencia);
    const val = Number(plazoValor) || 0;
    return plazoUnidad === 'años' ? val * periodosPorAno : Math.round((val / 12) * periodosPorAno);
  }, [plazoValor, plazoUnidad, frecuencia]);

  const tasaPeriodica = useMemo(() => {
    return (Number(tasaAnual) / 100) / Number(frecuencia);
  }, [tasaAnual, frecuencia]);

  // --- Generación del Cuadro de Amortización ---
  const tablaAmortizacion = useMemo(() => {
    const P = Number(monto) || 0;
    const n = numeroPeriodosTotales;
    const i = tasaPeriodica;

    if (P <= 0 || n <= 0 || i <= 0) return [];

    let saldo = P;
    const resultado = [];

    // Mapear pagos extraordinarios por periodo para búsqueda rápida
    const extrasMap = {};
    pagosExtra.forEach(pe => {
      if (pe.periodo > 0) {
        extrasMap[pe.periodo] = (extrasMap[pe.periodo] || 0) + pe.monto;
      }
    });

    // Cuota base para el sistema francés sin extras
    let cuotaBaseFrances = 0;
    if (sistema === 'frances') {
      cuotaBaseFrances = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    }

    // Amortización constante base para sistema alemán
    const amortizaciónBaseAleman = P / n;

    let fechaActual = new Date(fechaInicio);

    for (let k = 1; k <= n; k++) {
      if (saldo <= 0.001) break;

      // Calcular fecha del periodo
      let fechaPeriodo = new Date(fechaActual);
      if (frecuencia === 12) {
        fechaPeriodo.setMonth(fechaPeriodo.getMonth() + k);
      } else if (frecuencia === 24) {
        fechaPeriodo.setDate(fechaPeriodo.getDate() + (k * 15));
      } else if (frecuencia === 52) {
        fechaPeriodo.setDate(fechaPeriodo.getDate() + (k * 7));
      } else if (frecuencia === 1) {
        fechaPeriodo.setFullYear(fechaPeriodo.getFullYear() + k);
      }

      const interes = saldo * i;
      let extra = extrasMap[k] || 0;
      let amortizacion = 0;
      let cuotaTotal = 0;

      if (sistema === 'frances') {
        let cuotaActual = cuotaBaseFrances;
        amortizacion = cuotaActual - interes;
        
        // Si la amortización supera el saldo restante
        if (amortizacion + extra > saldo) {
          amortizacion = Math.max(0, saldo - extra);
          if (amortizacion + extra >= saldo) {
            extra = Math.max(0, saldo - amortizacion);
          }
        }
        cuotaTotal = amortizacion + interes + extra;
      } else {
        // Sistema Alemán (Amortización fija)
        amortizacion = Math.min(amortizaciónBaseAleman, saldo);
        cuotaTotal = amortizacion + interes + extra;
      }

      const capitalPagado = amortizacion + extra;
      const nuevoSaldo = Math.max(0, saldo - capitalPagado);

      resultado.push({
        periodo: k,
        fecha: fechaPeriodo.toISOString().split('T')[0],
        saldoInicial: saldo,
        cuotaBase: cuotaTotal - extra,
        interes: interes,
        amortizacionCapital: amortizacion,
        pagoExtra: extra,
        cuotaTotal: cuotaTotal,
        saldoFinal: nuevoSaldo
      });

      saldo = nuevoSaldo;
    }

    return resultado;
  }, [monto, numeroPeriodosTotales, tasaPeriodica, sistema, pagosExtra, fechaInicio, frecuencia]);

  // --- Resumen de Totales ---
  const resumen = useMemo(() => {
    const totalIntereses = tablaAmortizacion.reduce((acc, curr) => acc + curr.interes, 0);
    const totalPagado = tablaAmortizacion.reduce((acc, curr) => acc + curr.cuotaTotal, 0);
    const totalExtras = tablaAmortizacion.reduce((acc, curr) => acc + curr.pagoExtra, 0);
    const totalPeriodosEfectivos = tablaAmortizacion.length;
    const cuotaInicial = tablaAmortizacion.length > 0 ? tablaAmortizacion[0].cuotaTotal : 0;
    const cuotaFinal = tablaAmortizacion.length > 0 ? tablaAmortizacion[tablaAmortizacion.length - 1].cuotaTotal : 0;

    return {
      totalIntereses,
      totalPagado,
      totalExtras,
      totalPeriodosEfectivos,
      cuotaInicial,
      cuotaFinal
    };
  }, [tablaAmortizacion]);

  // --- Handlers de Pagos Extraordinarios ---
  const agregarPagoExtra = (e) => {
    e.preventDefault();
    const p = parseInt(nuevoExtraPeriodo);
    const m = parseFloat(nuevoExtraMonto);

    if (!p || p <= 0 || p > numeroPeriodosTotales) {
      alert(`Por favor ingrese un número de periodo válido (entre 1 y ${numeroPeriodosTotales})`);
      return;
    }
    if (!m || m <= 0) {
      alert('Por favor ingrese un monto válido para el pago extraordinario');
      return;
    }

    setPagosExtra([...pagosExtra, { periodo: p, monto: m }]);
    setNuevoExtraPeriodo('');
    setNuevoExtraMonto('');
  };

  const eliminarPagoExtra = (index) => {
    setPagosExtra(pagosExtra.filter((_, i) => i !== index));
  };

  // --- Exportación CSV ---
  const exportarCSV = () => {
    if (tablaAmortizacion.length === 0) return;

    const headers = ["Periodo,Fecha,Saldo Inicial,Cuota Regular,Intereses,Amortizacion Capital,Pago Extra,Cuota Total,Saldo Final\n"];
    const rows = tablaAmortizacion.map(r => 
      `${r.periodo},${r.fecha},${r.saldoInicial.toFixed(2)},${(r.cuotaBase).toFixed(2)},${r.interes.toFixed(2)},${r.amortizacionCapital.toFixed(2)},${r.pagoExtra.toFixed(2)},${r.cuotaTotal.toFixed(2)},${r.saldoFinal.toFixed(2)}`
    );

    const blob = new Blob([headers.concat(rows.join("\n")).join("")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Tabla_Amortizacion_${sistema.toUpperCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Formateador de moneda
  const formatMoneda = (val) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Calculadora de Amortización</h1>
                <p className="text-sm text-slate-500">Genera y analiza tablas de amortización de préstamos en tiempo real</p>
              </div>
            </div>
          </div>
          <button
            onClick={exportarCSV}
            disabled={tablaAmortizacion.length === 0}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </header>

        {/* Panel Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Formulario de Configuración (Columna Izquierda) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              Parámetros del Préstamo
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Monto */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Monto del Préstamo
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <DollarSign className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={monto}
                    onChange={(e) => setMonto(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-medium transition-all"
                    placeholder="100000"
                  />
                </div>
              </div>

              {/* Tasa de Interés */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Tasa de Interés Anual (%)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Percent className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-medium transition-all"
                    placeholder="12"
                  />
                </div>
              </div>

              {/* Plazo y Unidad */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Plazo
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={plazoValor}
                    onChange={(e) => setPlazoValor(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Unidad
                  </label>
                  <select
                    value={plazoUnidad}
                    onChange={(e) => setPlazoUnidad(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-medium transition-all"
                  >
                    <option value="años">Años</option>
                    <option value="meses">Meses</option>
                  </select>
                </div>
              </div>

              {/* Frecuencia de Pago */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Frecuencia de Pago
                </label>
                <select
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-medium transition-all"
                >
                  <option value={12}>Mensual (12/año)</option>
                  <option value={24}>Quincenal (24/año)</option>
                  <option value={52}>Semanal (52/año)</option>
                  <option value={1}>Anual (1/año)</option>
                </select>
              </div>

              {/* Sistema de Amortización */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Sistema de Amortización
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSistema('frances')}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                      sistema === 'frances'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Francés</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Cuota fija)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSistema('aleman')}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                      sistema === 'aleman'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Alemán</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Capital fijo)</span>
                  </button>
                </div>
              </div>

              {/* Fecha de Inicio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Fecha del Primer Pago
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-medium transition-all"
                  />
                </div>
              </div>
            </form>

            {/* Pagos Extraordinarios */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                <span>Pagos Extraordinarios</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
                  {pagosExtra.length}
                </span>
              </h3>

              <form onSubmit={agregarPagoExtra} className="grid grid-cols-5 gap-2">
                <input
                  type="number"
                  placeholder="N° Periodo"
                  value={nuevoExtraPeriodo}
                  onChange={(e) => setNuevoExtraPeriodo(e.target.value)}
                  className="col-span-2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Monto ($)"
                  value={nuevoExtraMonto}
                  onChange={(e) => setNuevoExtraMonto(e.target.value)}
                  className="col-span-2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center transition-colors"
                  title="Agregar pago extra"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {pagosExtra.length > 0 && (
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {pagosExtra.map((pe, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span>Periodo <strong>{pe.periodo}</strong>: {formatMoneda(pe.monto)}</span>
                      <button
                        onClick={() => eliminarPagoExtra(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Panel de Resultados y Visualización (Columna Derecha) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Navegación de Pestañas */}
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm gap-2">
              <button
                onClick={() => setPestanaActiva('resumen')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  pestanaActiva === 'resumen'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                Resumen Ejecutivo
              </button>
              <button
                onClick={() => setPestanaActiva('tabla')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  pestanaActiva === 'tabla'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                Tabla de Amortización
              </button>
              <button
                onClick={() => setPestanaActiva('graficos')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  pestanaActiva === 'graficos'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <PieChart className="w-4 h-4" />
                Análisis Gráfico
              </button>
            </div>

            {/* VISTA 1: RESUMEN EJECUTIVO */}
            {pestanaActiva === 'resumen' && (
              <div className="space-y-6">
                {/* Tarjetas Principales */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Monto Solicitado
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      {formatMoneda(monto)}
                    </span>
                    <span className="text-xs text-slate-500 block mt-2">
                      Capital prestado inicial
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Total Intereses
                    </span>
                    <span className="text-2xl font-black text-rose-600">
                      {formatMoneda(resumen.totalIntereses)}
                    </span>
                    <span className="text-xs text-rose-500/80 block mt-2 font-medium">
                      {((resumen.totalIntereses / (monto || 1)) * 100).toFixed(1)}% del capital inicial
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-black text-indigo-600">
                      {formatMoneda(resumen.totalPagado)}
                    </span>
                    <span className="text-xs text-indigo-500/80 block mt-2 font-medium">
                      Capital + Intereses
                    </span>
                  </div>
                </div>

                {/* Detalles Adicionales */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
                    Detalles de Pagos y Estructura
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500">Sistema Aplicado:</span>
                      <span className="font-semibold text-slate-800 capitalize">
                        {sistema === 'frances' ? 'Francés (Cuota Fija)' : 'Alemán (Amortización Fija)'}
                      </span>
                    </div>

                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500">Número de Pagos:</span>
                      <span className="font-semibold text-slate-800">
                        {resumen.totalPeriodosEfectivos} periodos
                      </span>
                    </div>

                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500">Primera Cuota:</span>
                      <span className="font-semibold text-slate-800">
                        {formatMoneda(resumen.cuotaInicial)}
                      </span>
                    </div>

                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500">Última Cuota:</span>
                      <span className="font-semibold text-slate-800">
                        {formatMoneda(resumen.cuotaFinal)}
                      </span>
                    </div>

                    {resumen.totalExtras > 0 && (
                      <div className="flex justify-between p-3 bg-emerald-50 rounded-xl text-emerald-900 sm:col-span-2">
                        <span className="font-medium">Pagos Extraordinarios Totales:</span>
                        <span className="font-bold">{formatMoneda(resumen.totalExtras)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explicación del Sistema */}
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex gap-4 items-start">
                  <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 space-y-1">
                    <h4 className="font-bold text-indigo-950 text-sm">
                      {sistema === 'frances' ? '¿Cómo funciona el Sistema Francés?' : '¿Cómo funciona el Sistema Alemán?'}
                    </h4>
                    {sistema === 'frances' ? (
                      <p>
                        En el sistema francés las <strong>cuotas son fijas</strong> durante todo el plazo. Al principio, la mayor parte de la cuota cubre los intereses y una menor parte amortiza el capital. Con el paso del tiempo, la proporción se invierte pagando más capital.
                      </p>
                    ) : (
                      <p>
                        En el sistema alemán la <strong>amortización de capital es constante</strong>. Dado que los intereses disminuyen a medida que se reduce el saldo pendiente, las <strong>cuotas totales van decreciendo</strong> periodo a periodo.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VISTA 2: TABLA DE AMORTIZACIÓN */}
            {pestanaActiva === 'tabla' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-sm">
                    Proyección Completa de Pagos ({tablaAmortizacion.length} registros)
                  </h3>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-semibold uppercase sticky top-0 z-10">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Fecha</th>
                        <th className="p-3">Saldo Inicial</th>
                        <th className="p-3">Cuota Base</th>
                        <th className="p-3">Interés</th>
                        <th className="p-3">Amort. Capital</th>
                        <th className="p-3">Extra</th>
                        <th className="p-3">Pago Total</th>
                        <th className="p-3">Saldo Final</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {tablaAmortizacion.map((row) => (
                        <tr 
                          key={row.periodo} 
                          className={`hover:bg-slate-50 transition-colors ${row.pagoExtra > 0 ? 'bg-emerald-50/30' : ''}`}
                        >
                          <td className="p-3 text-slate-400 font-normal">{row.periodo}</td>
                          <td className="p-3 whitespace-nowrap">{row.fecha}</td>
                          <td className="p-3">{formatMoneda(row.saldoInicial)}</td>
                          <td className="p-3">{formatMoneda(row.cuotaBase)}</td>
                          <td className="p-3 text-rose-600">{formatMoneda(row.interes)}</td>
                          <td className="p-3 text-emerald-600">{formatMoneda(row.amortizacionCapital)}</td>
                          <td className="p-3 font-semibold text-emerald-700">
                            {row.pagoExtra > 0 ? formatMoneda(row.pagoExtra) : '-'}
                          </td>
                          <td className="p-3 font-bold text-slate-900">{formatMoneda(row.cuotaTotal)}</td>
                          <td className="p-3 font-medium text-slate-500">{formatMoneda(row.saldoFinal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VISTA 3: ANÁLISIS GRÁFICO */}
            {pestanaActiva === 'graficos' && (
              <div className="space-y-6">
                
                {/* Distribución del Pago Total */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-base">
                    Proporción Total: Capital vs. Intereses
                  </h3>
                  
                  {/* Barra Visual Proporcional */}
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                      <div 
                        style={{ width: `${(monto / resumen.totalPagado) * 100}%` }}
                        className="bg-indigo-600 h-full transition-all duration-500"
                        title="Capital"
                      />
                      <div 
                        style={{ width: `${(resumen.totalIntereses / resumen.totalPagado) * 100}%` }}
                        className="bg-rose-500 h-full transition-all duration-500"
                        title="Intereses"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-indigo-600 rounded-full inline-block"></span>
                        <span className="text-slate-600">Capital Pretado: <strong>{((monto / resumen.totalPagado) * 100).toFixed(1)}%</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-rose-500 rounded-full inline-block"></span>
                        <span className="text-slate-600">Intereses Totales: <strong>{((resumen.totalIntereses / resumen.totalPagado) * 100).toFixed(1)}%</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evolución del Saldo Párrafo Visual */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-base">
                    Evolución del Saldo Insoluto
                  </h3>
                  
                  {/* Gráfico Simple de Barras del Saldo Pendiente */}
                  <div className="h-48 flex items-end gap-1 pt-6 border-b border-slate-100 pb-2 overflow-x-auto">
                    {tablaAmortizacion.map((r, i) => {
                      // Mostrar máximo 50 barras para legibilidad
                      const factor = Math.ceil(tablaAmortizacion.length / 50);
                      if (i % factor !== 0 && i !== tablaAmortizacion.length - 1) return null;

                      const pct = (r.saldoFinal / monto) * 100;
                      return (
                        <div key={r.periodo} className="flex-1 flex flex-col items-center min-w-[6px] group relative">
                          {/* Tooltip superpuesto */}
                          <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-900 text-white text-[10px] p-2 rounded-lg z-20 whitespace-nowrap shadow-lg">
                            <span>Periodo {r.periodo}</span>
                            <span>Saldo: {formatMoneda(r.saldoFinal)}</span>
                          </div>

                          <div 
                            style={{ height: `${Math.max(4, pct)}%` }}
                            className="w-full bg-indigo-500 hover:bg-indigo-700 rounded-t-sm transition-all"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-2">
                    <span>Inicio (Periodo 1)</span>
                    <span>Progresión del Saldo</span>
                    <span>Final (Periodo {tablaAmortizacion.length})</span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}