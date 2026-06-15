uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.35 + vec2(t * 1.08, -t * 1.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.29, length(p) * 3.71 - time * 0.34); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.25; p = rot2(1.57) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.08, vec3(0.42, 0.57, 0.49), vec3(0.35, 0.36, 0.45), vec3(0.91, 0.95, 1.00), vec3(0.88, 0.91, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
