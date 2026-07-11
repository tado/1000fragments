uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.69 + t * 1.90 + ph) + sin(p.y * 3.33 - t * 4.04 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.37 + sin(p.y * 2.33 + t * 3.44) * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.31; p = rot2(2.53) * p; }
	p = fract(p * 2.63) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 2.01 + time * -0.28); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = d1 * d2;
	vec3 col = palette(d * 0.79 + time * 0.17, vec3(0.52, 0.41, 0.43), vec3(0.36, 0.42, 0.35), vec3(1.10, 0.90, 1.10), vec3(0.05, 0.49, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
