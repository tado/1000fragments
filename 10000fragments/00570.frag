uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.58 + sin(p.y * 4.06 + t * 1.66) * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.47, lr * 2.94 + time * -0.45); }
	p = rot2(0.57) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(0.47) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.11, vec3(0.43, 0.49, 0.40), vec3(0.45, 0.38, 0.35), vec3(0.98, 0.81, 0.74), vec3(0.04, 0.90, 0.80));
	col = fract(col * 1.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
