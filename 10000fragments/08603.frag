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
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.38 + sr * 9.74 - t * 0.75 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 33.26 - t * 3.27 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 19.65 - t * 2.05 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.95 + ph), vnoise2(p * 1.95 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.95 + 3.13 * wq + vec2(1.7, 9.2) + t * 0.79),
                   vnoise2(p * 1.95 + 3.77 * wq + vec2(8.3, 2.8) - t * 0.40));
    v = vnoise2(p * 1.95 + 1.32 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.50 / wf * sin(wf * 3.28 * q1.y + time * 1.70); q1.y += 0.46 / wf * cos(wf * 2.80 * q1.x + time * 1.95); }
	q2.x += sin(q2.y * 4.76 + time * 2.60) * 0.22;
	q3 += vec2(0.86, 1.00) * sin(length(q3) * 4.04 - time * 1.50) * 0.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.05);
	float d3 = fieldC(q3, time, 0.98);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 0.54, 1.42) + vec3(0.17, 0.01, 0.20);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 2.81 + time * 9.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
