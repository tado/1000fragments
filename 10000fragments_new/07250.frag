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
    vec2 vp = p * 2.94; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.06 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.69 + sin(p.y * 4.88 + t * 4.46) * 1.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.08;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.40; p = rot2(1.79) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = d1 * d2;
	vec3 col = palette(d * 1.64 + time * 0.09, vec3(0.41, 0.47, 0.52), vec3(0.39, 0.32, 0.42), vec3(0.89, 0.80, 0.97), vec3(0.35, 0.73, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
