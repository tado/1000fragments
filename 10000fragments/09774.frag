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
    vec2 vp = p * 3.69; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.60 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.81 + sin(p.y * 3.19 + t * 4.31) * 1.62 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.61, t * 1.28 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.17, -0.66) * sin(length(q1) * 2.35 - time * 1.53) * 0.25;
	q2 = sin(q2 * 2.63 + time * 0.90) * 1.37;
	q3 = fract(q3 * 1.26) - 0.5;
	q3 = rot2(time * -0.72) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.36);
	float d3 = fieldC(q3, time, 1.23);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.11, vec3(0.51, 0.50, 0.57), vec3(0.40, 0.34, 0.43), vec3(0.94, 1.27, 0.98), vec3(0.51, 0.40, 0.11));
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
