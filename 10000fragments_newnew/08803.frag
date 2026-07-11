uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.78; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.58 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.16;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.62; kp = rot2(1.93) * kp; kp *= 1.23; }
    v = sin(kp.y * 3.29 - t * 1.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.23 / wf * sin(wf * 2.56 * q2.y + time * 1.19); q2.y += 0.25 / wf * cos(wf * 3.36 * q2.x + time * 1.37); }
	q2 *= 1.0 + 0.40 * sin(time * 1.13);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.17);
	float d = d1 * d2;
	vec3 col = hue(d * 0.51 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
