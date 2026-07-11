uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 16.28 - t * 4.94 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 9.62 - t * 7.95 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.69);
    float gsh = hash21(vec2(grow, floor(t * 3.57))) - 0.5;
    float gx = p.x + gsh * 0.32;
    v = sin(gx * 15.03 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.53));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.91 + t * 1.30 + ph) + sin(p.y * 10.87 - t * 2.67 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.32 / wf * sin(wf * 2.79 * q1.y + time * 0.91); q1.y += 0.27 / wf * cos(wf * 1.87 * q1.x + time * 1.76); }
	q1 = fract(q1 * 1.21) - 0.5;
	q2 *= 1.48;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d3 = fieldC(q3, time, 0.47);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.62 + time * 0.11, vec3(0.45, 0.48, 0.55), vec3(0.34, 0.38, 0.40), vec3(0.84, 0.86, 1.31), vec3(0.43, 0.42, 0.64));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
