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
    v = 0.25 * (sin(p.x * 3.95 + t * 4.99 + ph) + sin(p.y * 9.58 - t * 4.99 + ph)
        + sin((p.x + p.y) * 11.02 + t * 4.99 + ph) + sin(length(p) * 10.65 - t * 4.99 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.66; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.85 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.39; }
	q2.x += sin(q2.y * 7.94 + time * 2.07) * 0.20;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.30);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.43 + time * 0.08, vec3(0.58, 0.59, 0.44), vec3(0.41, 0.45, 0.49), vec3(1.05, 0.74, 0.94), vec3(0.33, 0.18, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
