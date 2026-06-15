uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.12 * cos(sa * 6 + t * 0.54 + ph);
    v = sin((sr - petal) * 16.18);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.91 + t * 2.03 + ph) + sin(p.y * 8.98 - t * 4.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.17; p = rot2(1.93) * p; }
	p = rot2(length(p) * 1.45 + time * 0.78) * p;
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = d1 + d2;
	vec3 col = palette(d * 1.02 + time * 0.16, vec3(0.54, 0.46, 0.48), vec3(0.35, 0.41, 0.32), vec3(1.39, 0.93, 0.82), vec3(0.48, 0.80, 0.70));
	col = clamp((col - 0.5) * 1.56 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
