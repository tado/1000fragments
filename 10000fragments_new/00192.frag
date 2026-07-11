uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.54;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.69; kp = rot2(2.72) * kp; kp *= 1.25; }
    v = sin(kp.y * 1.57 - t * 4.39 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.91 + ph), sin(lt * 5.0 + t * 0.37)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.46) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.33;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.68 - t * 2.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.18; q1 = rot2(1.05) * q1; }
	q2 = rot2(1.64) * q2;
	q3 = fract(q3 * 1.55) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.07);
	float d3 = fieldC(q3, time, 0.29);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.94 + time * 0.30, vec3(0.50, 0.54, 0.57), vec3(0.34, 0.46, 0.32), vec3(0.71, 1.24, 0.93), vec3(0.41, 0.31, 0.92));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
