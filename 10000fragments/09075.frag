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
    v = 0.25 * (sin(p.x * 12.45 + t * 3.47 + ph) + sin(p.y * 8.90 - t * 3.47 + ph)
        + sin((p.x + p.y) * 6.37 + t * 3.47 + ph) + sin(length(p) * 5.99 - t * 3.47 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.02; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.33 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.77);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.22, vec3(0.54, 0.51, 0.57), vec3(0.47, 0.45, 0.47), vec3(0.94, 0.88, 0.75), vec3(0.90, 0.86, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
