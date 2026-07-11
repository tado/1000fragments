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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 3.87 * sin(t * 0.97) + t * 4.21 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.84 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.20); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.27;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.62; kp = rot2(0.76) * kp; kp *= 1.40; }
    v = sin(kp.x * 1.92 - t * 2.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.75; }
	q1.x += sin(q1.y * 7.17 + time * 2.62) * 0.31;
	q2 = (floor(q2 * 26.5) + 0.5) / 26.5;
	q2 = rot2(2.91) * q2;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.34 / wf * sin(wf * 2.25 * q3.y + time * 0.68); q3.y += 0.26 / wf * cos(wf * 1.97 * q3.x + time * 1.25); }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.55);
	float d3 = fieldC(q3, time, 1.80);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.83, 0.91, 1.41) + vec3(0.13, 0.11, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
