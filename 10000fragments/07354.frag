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
    vec2 vp = p * 8.47; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.27 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.70, lr * 1.10 + time * -0.41); }
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.05, vec3(0.51, 0.47, 0.53), vec3(0.37, 0.50, 0.41), vec3(1.04, 1.22, 0.74), vec3(0.49, 0.37, 0.67));
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
