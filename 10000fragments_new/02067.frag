uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.84;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.62; kp = rot2(2.51) * kp; kp *= 1.19; }
    v = sin(kp.y * 2.68 - t * 2.08 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.27 + t * 1.54 + ph) * 0.7;
    float wb = sin(p.y * 8.92 - t * 1.97 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.68;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.11; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.41 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(1.93) * q2;
	q2 = rot2(q2.y * 3.07 + time * 0.36) * q2;
	q3 = abs(q3);
	q3 *= 1.75;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d3 = fieldC(q3, time, 1.92);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.81, 0.69, 0.29) * (0.10 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
