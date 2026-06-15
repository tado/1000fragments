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
    vec2 vp = p * 6.25; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.71 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.44 + t * 1.60 + ph) + sin(p.y * 6.85 - t * 1.60 + ph)
        + sin((p.x + p.y) * 7.78 + t * 1.60 + ph) + sin(length(p) * 17.81 - t * 1.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.83;
	p = rot2(time * 0.73) * p;
	p = rot2(p.y * 3.32 + time * 0.90) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.58);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.55 + time * 0.16, vec3(0.42, 0.58, 0.45), vec3(0.47, 0.49, 0.41), vec3(1.08, 0.76, 1.03), vec3(0.31, 0.19, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
