uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.10 + vec2(t * 2.36, -t * 2.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -2.30 + time * 0.51) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.55; p = rot2(1.70) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.01, vec3(0.52, 0.50, 0.40), vec3(0.44, 0.31, 0.32), vec3(1.22, 1.31, 1.09), vec3(0.21, 0.47, 0.64));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
