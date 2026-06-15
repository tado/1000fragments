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
    vec2 dp = fract(p * 4.27) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 0.91 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.62; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.87 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 3.00 + time * -0.47); }
	p = fract(p * 2.75) - 0.5;
	p = abs(p) - 0.77;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.80);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.26 + time * 0.12, vec3(0.43, 0.43, 0.50), vec3(0.47, 0.47, 0.48), vec3(0.94, 1.24, 0.76), vec3(0.82, 0.62, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
