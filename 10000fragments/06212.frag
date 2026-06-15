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
    v = 0.25 * (sin(p.x * 4.79 + t * 2.66 + ph) + sin(p.y * 4.81 - t * 2.66 + ph)
        + sin((p.x + p.y) * 6.90 + t * 2.66 + ph) + sin(length(p) * 14.16 - t * 2.66 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.11; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.43 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.65 + time * 0.23, vec3(0.49, 0.42, 0.48), vec3(0.46, 0.50, 0.50), vec3(0.88, 0.71, 1.35), vec3(0.48, 0.54, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
