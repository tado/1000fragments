uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 35.45 - t * 6.46 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 19.69 - t * 6.59 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.86) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 2.25 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.73 - t * 1.18;
    v = sin(floor(lv * 2.6) / 2.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -1.38 + time * 1.29) * q1;
	q2 = fract(q2 * 2.64) - 0.5;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.40; q2 = rot2(2.39) * q2; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q3.x += 0.33 / wf * sin(wf * 3.47 * q3.y + time * 0.65); q3.y += 0.23 / wf * cos(wf * 1.56 * q3.x + time * 1.82); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d3 = fieldC(q3, time, 0.35);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.48 + time * 0.25);
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 1.48 + time * 6.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
