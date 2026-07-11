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
    v = sin(sa * 8.51 + sr * 17.44 - t * 1.93 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.34 + vec2(t * 2.44, -t * 2.44) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	p *= 2.33;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(1.09) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.23);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.65 + time * 0.05, vec3(0.51, 0.58, 0.45), vec3(0.47, 0.30, 0.33), vec3(1.01, 1.34, 0.98), vec3(0.18, 0.93, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
