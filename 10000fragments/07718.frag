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
    vec2 vp = p * 7.39; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.52 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.51 * jf)) * 0.60;
        xs += sin(length(p - im) * 83.75 - t * 7.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 2.96 - time * 0.77); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = d1 * d2;
	vec3 col = palette(d * 0.51 + time * 0.19, vec3(0.54, 0.57, 0.44), vec3(0.39, 0.34, 0.41), vec3(1.30, 1.34, 1.18), vec3(0.25, 0.82, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
