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
    vec2 vp = p * 7.61; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.61 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.92) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.31 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.73;
	p = abs(p) - 0.48;
	p += vec2(0.94, 0.53) * sin(length(p) * 5.81 - time * 1.19) * 0.17;
	p = rot2(2.40) * p;
	p *= 1.77;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = d1 + d2;
	vec3 col = palette(d * 1.25 + time * 0.09, vec3(0.41, 0.47, 0.53), vec3(0.49, 0.35, 0.44), vec3(1.18, 0.83, 1.39), vec3(0.88, 0.81, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
