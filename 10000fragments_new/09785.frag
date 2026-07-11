uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.41; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.55 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.65 + t * 1.36 + ph) + sin(p.y * 16.01 - t * 4.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	p += vec2(-0.79, -0.62) * sin(length(p) * 5.18 - time * 2.48) * 0.14;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.56 * p.y + time * 1.31); p.y += 0.39 / wf * cos(wf * 1.82 * p.x + time * 1.41); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = d1 + d2;
	vec3 col = palette(d * 0.81 + time * 0.30, vec3(0.42, 0.54, 0.48), vec3(0.43, 0.41, 0.50), vec3(1.36, 0.81, 1.09), vec3(0.08, 0.03, 0.32));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
