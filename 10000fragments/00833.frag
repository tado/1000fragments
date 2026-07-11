uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.98 + sin(p.y * 1.35 + t * 4.20) * 4.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.35; p = rot2(1.49) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.14, vec3(0.55, 0.45, 0.58), vec3(0.31, 0.45, 0.34), vec3(1.23, 0.84, 0.91), vec3(0.58, 0.82, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
