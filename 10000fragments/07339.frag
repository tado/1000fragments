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
    vec2 vp = p * 8.01; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.87 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.24 + t * 1.62 + ph) + sin(p.y * 11.15 - t * 1.62 + ph)
        + sin((p.x + p.y) * 9.71 + t * 1.62 + ph) + sin(length(p) * 5.33 - t * 1.62 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.29 + time * 0.02, vec3(0.42, 0.57, 0.53), vec3(0.36, 0.32, 0.36), vec3(1.01, 0.90, 1.02), vec3(0.51, 0.04, 0.90));
	col = mod(col * 1.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
