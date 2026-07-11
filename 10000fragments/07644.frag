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
    v = 0.25 * (sin(p.x * 2.24 + t * 1.66 + ph) + sin(p.y * 6.60 - t * 1.66 + ph)
        + sin((p.x + p.y) * 7.37 + t * 1.66 + ph) + sin(length(p) * 7.28 - t * 1.66 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.55; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.38 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.68) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = d1 + d2;
	vec3 col = palette(d * 0.93 + time * 0.21, vec3(0.58, 0.57, 0.43), vec3(0.30, 0.30, 0.31), vec3(1.00, 1.27, 1.37), vec3(0.63, 0.32, 0.11));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
