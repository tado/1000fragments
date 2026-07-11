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
    vec2 vp = p * 5.91; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.81 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.18 * cos(sa * 4 + t * 2.72 + ph);
    v = sin((sr - petal) * 8.56);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	p = fract(p * 1.14) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.99, lr * 1.75 + time * -0.72); }
	p = abs(p) - 0.73;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = d1 * d2;
	vec3 col = palette(d * 1.24 + time * 0.28, vec3(0.44, 0.46, 0.58), vec3(0.38, 0.41, 0.49), vec3(0.88, 1.15, 1.26), vec3(0.16, 0.04, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
