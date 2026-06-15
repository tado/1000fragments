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
    vec2 vp = p * 7.93; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.54 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.84 + t * 4.20 + ph) + sin(p.y * 13.55 - t * 5.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	p = rot2(length(p) * 2.62 + time * 0.75) * p;
	p += vec2(0.97, 0.02) * sin(length(p) * 4.66 - time * 0.71) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = d1 * d2;
	vec3 col = palette(d * 1.09 + time * 0.21, vec3(0.41, 0.46, 0.53), vec3(0.30, 0.49, 0.39), vec3(0.77, 0.77, 0.71), vec3(0.67, 0.41, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
