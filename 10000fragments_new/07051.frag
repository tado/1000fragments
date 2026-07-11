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
    vec2 kp = p * 1.22;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.57; kp = rot2(1.46) * kp; kp *= 1.31; }
    v = sin(kp.x * 2.60 - t * 2.23 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.31; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.44 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.92, lr * 1.48 + time * -0.56); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.39 / wf * sin(wf * 2.23 * q1.y + time * 2.13); q1.y += 0.44 / wf * cos(wf * 2.50 * q1.x + time * 1.42); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.67 + time * 0.38, vec3(0.47, 0.57, 0.56), vec3(0.31, 0.31, 0.43), vec3(1.27, 1.07, 1.18), vec3(0.89, 0.53, 0.08));
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.22 + time * 10.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
