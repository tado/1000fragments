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
    vec2 vp = p * 6.44; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.24 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.38 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.95 + t * 1.58 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.01 + t * 2.06 + ph) * 0.7;
    float wb = sin(p.y * 6.06 - t * 3.99 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3.y += sin(q3.x * 6.04 + time * 2.38) * 0.19;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d3 = fieldC(q3, time, 0.70);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = palette(d * 0.67 + time * 0.36, vec3(0.46, 0.50, 0.46), vec3(0.39, 0.43, 0.43), vec3(0.91, 1.23, 1.10), vec3(0.07, 0.83, 0.61));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
