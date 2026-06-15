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
    float petal = 0.34 + 0.23 * cos(sa * 8 + t * 0.93 + ph);
    v = sin((sr - petal) * 16.61);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 18.91 - t * 4.84 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 35.64 - t * 4.84 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(1.45) * p; }
	p = fract(p * 1.90) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.12, vec3(0.57, 0.44, 0.46), vec3(0.34, 0.48, 0.44), vec3(0.73, 0.75, 1.36), vec3(0.30, 0.13, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
