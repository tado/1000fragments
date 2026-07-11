uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.95; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.22 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.75);
    float gsh = hash21(vec2(grow, floor(t * 7.05))) - 0.5;
    float gx = p.x + gsh * 1.10;
    v = sin(gx * 16.52 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.02));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.77 + time * 0.02, vec3(0.53, 0.45, 0.57), vec3(0.49, 0.36, 0.35), vec3(1.39, 1.23, 0.71), vec3(0.55, 0.05, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
