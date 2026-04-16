# EPICOS PLAN DE PRUEBAS

## T01: Stress & Stability
- Check system parameters under load.
- Verify swappiness and free_kbytes compliance.

## T02: Latency Index
- Benchmark /dev/shm/epicos_tree.json access.
- Goal: <1ms latency.

## T03: Hot-Swap PHP
- Measure time between PHP version switches.
- Goal: <500ms downtime.

## T04: SDK Integrity
- Verify @google/generative-ai and @anthropic-ai linking.
- Ensure no external downloads required.

## T05: Determinismo
- Verify Aura-Sync reconciliator service status.
- Confirm system state is locked to spec.
