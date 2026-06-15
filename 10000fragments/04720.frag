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
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.60 + sr * 17.64 - t * 4.87 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.40; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.36 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 3.57 - time * 0.29); }
	p += vec2(-0.16, 0.12) * sin(length(p) * 5.45 - time * 1.31) * 0.24;
	p = abs(p) - 0.57;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.63 + time * 0.27, vec3(0.45, 0.49, 0.57), vec3(0.44, 0.39, 0.34), vec3(1.15, 1.00, 0.88), vec3(0.33, 0.16, 0.11));
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
