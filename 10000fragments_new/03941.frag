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
    vec2 vp = p * 4.68; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.49 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.77 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.50) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	p += vec2(-0.68, -0.22) * sin(length(p) * 3.21 - time * 0.98) * 0.31;
	p = fract(p * 2.44) - 0.5;
	p *= 3.07;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.08);
	float d = d1 + d2;
	vec3 col = palette(d * 1.29 + time * 0.13, vec3(0.43, 0.42, 0.54), vec3(0.44, 0.45, 0.43), vec3(1.09, 0.77, 1.07), vec3(0.62, 0.87, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
