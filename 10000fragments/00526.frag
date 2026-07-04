uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.20; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.17 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.76;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.58; kp = rot2(1.18) * kp; kp *= 1.16; }
    v = sin(kp.y * 1.82 - t * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.73));
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.26; q1 = rot2(1.02) * q1; }
	q2 *= 1.0 + 0.23 * sin(time * 2.34);
	q2 = sin(q2 * 1.53 + time * 1.15) * 0.60;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.25);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.68));
	vec3 col = palette(d * 0.60 + time * 0.02, vec3(0.43, 0.54, 0.44), vec3(0.48, 0.33, 0.33), vec3(0.98, 1.05, 0.88), vec3(0.03, 0.02, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
