uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.93; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.54 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.90 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.33 + t * 1.96 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 1.75 * q2.y + time * 0.92); q2.y += 0.25 / wf * cos(wf * 3.28 * q2.x + time * 1.49); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.02));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.31, vec3(0.54, 0.53, 0.50), vec3(0.40, 0.49, 0.41), vec3(1.00, 1.22, 1.33), vec3(0.49, 0.83, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
