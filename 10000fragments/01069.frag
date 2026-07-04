uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.18; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.02 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.27);
    float gsh = hash21(vec2(grow, floor(t * 3.62))) - 0.5;
    float gx = p.x + gsh * 0.75;
    v = sin(gx * 17.10 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.10));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.14 + time * 0.75) * 1.06;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 1.88 * q2.y + time * 1.21); q2.y += 0.22 / wf * cos(wf * 1.73 * q2.x + time * 1.20); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.42);
	float d = d1 * d2;
	vec3 col = palette(d * 0.50 + time * 0.31, vec3(0.49, 0.60, 0.60), vec3(0.36, 0.43, 0.38), vec3(0.86, 1.18, 1.05), vec3(0.97, 0.08, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
