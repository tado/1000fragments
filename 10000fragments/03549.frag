uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.05 + vec2(t * 0.86, -t * 0.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.50 + sin(p.y * 1.25 + t * 1.58) * 2.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.18; p = rot2(1.66) * p; }
	p = rot2(1.00) * p;
	p = rot2(length(p) * -1.09 + time * 0.70) * p;
	p = abs(p) - 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.13 + time * 0.06, vec3(0.48, 0.58, 0.54), vec3(0.46, 0.35, 0.45), vec3(1.33, 1.05, 0.75), vec3(0.62, 0.32, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
