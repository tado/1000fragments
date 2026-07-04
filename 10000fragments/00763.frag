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
    vec2 vp = p * 7.34; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.61 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	p.y += sin(p.x * 4.62 + time * 1.41) * 0.22;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.57; p = rot2(0.31) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.17, vec3(0.48, 0.53, 0.51), vec3(0.35, 0.32, 0.32), vec3(1.38, 1.35, 1.28), vec3(0.43, 0.88, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
