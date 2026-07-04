uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.78 + vec2(t * 1.26, -t * 0.32);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.06 + t * 3.60 + ph) * 0.7;
    float wb = sin(p.y * 13.83 - t * 1.15 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.66 + ph), vnoise2(p * 2.66 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.66 + 1.63 * wq + vec2(1.7, 9.2) + t * 0.49),
                   vnoise2(p * 2.66 + 3.91 * wq + vec2(8.3, 2.8) - t * 0.70));
    v = vnoise2(p * 2.66 + 3.77 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.25 / wf * sin(wf * 3.94 * q1.y + time * 0.68); q1.y += 0.37 / wf * cos(wf * 1.97 * q1.x + time * 2.06); }
	q3 = sin(q3 * 2.07 + time * 1.76) * 1.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.77);
	float d3 = fieldC(q3, time, 1.51);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = vec3(1.00, 0.65, 0.94) * (0.23 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
