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
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.34 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.55) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.15; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.28 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.37 / wf * sin(wf * 3.99 * q1.y + time * 1.92); q1.y += 0.40 / wf * cos(wf * 1.97 * q1.x + time * 1.25); }
	q2 += vec2(-0.21, -0.44) * sin(length(q2) * 4.39 - time * 1.67) * 0.32;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.65);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.54 + time * 0.05, vec3(0.59, 0.41, 0.41), vec3(0.36, 0.49, 0.40), vec3(1.01, 0.79, 1.35), vec3(0.72, 0.55, 0.75));
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 1.55 + time * 15.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
