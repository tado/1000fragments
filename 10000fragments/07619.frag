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

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.39 * jf)) * 0.92;
        xs += sin(length(p - im) * 93.23 - t * 4.30 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.32; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.46 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p = rot2(length(p) * 3.25 + time * 0.53) * p;
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 4.74 - time * 0.45); }
	p *= 2.51;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.78);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.14, vec3(0.58, 0.55, 0.50), vec3(0.49, 0.45, 0.46), vec3(1.00, 1.21, 1.04), vec3(0.90, 0.89, 0.64));
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
