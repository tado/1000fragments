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
    float petal = 0.50 + 0.24 * cos(sa * 7 + t * 0.68 + ph);
    v = sin((sr - petal) * 17.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.51;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.11; p = rot2(2.43) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.10, vec3(0.42, 0.59, 0.51), vec3(0.45, 0.45, 0.34), vec3(1.14, 1.37, 1.15), vec3(0.69, 0.63, 0.07));
	col = mod(col * 1.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
