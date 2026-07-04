uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.10;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.33 + 0.06 * sin(t * 1.95 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.69 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.39); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.78 + sin(p.y * 4.75 + t * 2.69) * 2.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.89, 0.52) * sin(length(q1) * 2.73 - time * 0.82) * 0.27;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.34 / wf * sin(wf * 3.95 * q2.y + time * 1.51); q2.y += 0.20 / wf * cos(wf * 3.99 * q2.x + time * 2.01); }
	q2 = sin(q2 * 1.56 + time * 2.47) * 0.80;
	for(int fo = 0; fo < 4; fo++){ q3 = abs(q3) - 0.33; q3 = rot2(0.94) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.86);
	float d3 = fieldC(q3, time, 0.20);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = vec3(0.84, 0.69, 0.50) * (0.07 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
