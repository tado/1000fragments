uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.60, t * 0.86 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.32);
    float gsh = hash21(vec2(grow, floor(t * 7.37))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 19.45 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.10));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	{ p = vec2(atan(p.y, p.x) * 2.88, length(p) * 5.52 - time * 0.57); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.34 + time * 0.14, vec3(0.51, 0.57, 0.55), vec3(0.32, 0.39, 0.46), vec3(1.36, 0.86, 1.13), vec3(0.95, 0.51, 0.12));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
