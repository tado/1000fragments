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
    vec2 vp = p * 7.52; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.91 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.52 + t * 3.47 + ph) + sin(p.y * 8.79 - t * 1.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p += vec2(-0.26, -0.72) * sin(length(p) * 2.35 - time * 1.31) * 0.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.19 + time * 0.25, vec3(0.51, 0.44, 0.42), vec3(0.45, 0.33, 0.39), vec3(1.31, 0.88, 1.32), vec3(0.06, 0.99, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
