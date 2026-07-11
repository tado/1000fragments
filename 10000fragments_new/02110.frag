uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.88 + sin(p.y * 1.96 + t * 1.65) * 2.12 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.59 + vec2(t * 1.59, -t * 2.23) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(1.85) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.46, length(p) * 3.99 - time * 0.81); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.62 + time * 0.12, vec3(0.46, 0.43, 0.46), vec3(0.45, 0.38, 0.40), vec3(1.21, 0.92, 1.27), vec3(0.32, 0.00, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
