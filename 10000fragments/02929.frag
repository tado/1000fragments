uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.71 + vec2(t * 2.15, -t * 2.15) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.98;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(1.30) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.08, vec3(0.56, 0.42, 0.51), vec3(0.47, 0.37, 0.48), vec3(1.17, 0.85, 0.90), vec3(0.00, 0.46, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
