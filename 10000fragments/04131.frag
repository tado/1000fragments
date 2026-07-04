uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.63 + ph), vnoise2(p * 3.63 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.63 + 1.70 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 3.63 + 1.11 * wq + vec2(8.3, 2.8) - t * 0.68));
    v = vnoise2(p * 3.63 + 1.16 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.94; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.00 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.59;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.83 + time * 0.22, vec3(0.49, 0.44, 0.52), vec3(0.39, 0.46, 0.50), vec3(1.11, 1.10, 0.89), vec3(0.39, 0.30, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
