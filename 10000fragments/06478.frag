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
    vec2 vp = p * 5.80; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.41 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.08) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 1.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.73 + time * 0.45) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.93, length(q1) * 2.04 - time * 0.57); }
	q2 = rot2(q2.y * 1.34 + time * 1.19) * q2;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.26 / wf * sin(wf * 1.98 * q2.y + time * 0.87); q2.y += 0.31 / wf * cos(wf * 1.66 * q2.x + time * 0.85); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.45);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.32));
	vec3 col = palette(d * 0.42 + time * 0.12, vec3(0.50, 0.55, 0.53), vec3(0.30, 0.30, 0.47), vec3(0.87, 1.05, 0.96), vec3(0.49, 0.01, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
