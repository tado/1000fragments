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
    vec2 zp = p * 6.66;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.97)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.55 - t * 4.95 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.27; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.26 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.31 / wf * sin(wf * 2.18 * q2.y + time * 0.77); q2.y += 0.30 / wf * cos(wf * 2.97 * q2.x + time * 2.08); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.25, vec3(0.45, 0.45, 0.46), vec3(0.39, 0.35, 0.45), vec3(1.39, 1.20, 1.19), vec3(0.46, 0.76, 0.97));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
