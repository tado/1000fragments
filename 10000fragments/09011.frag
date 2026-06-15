uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.37 + vec2(t * 2.45, -t * 2.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.51 + t * 3.58 + ph) + sin(p.y * 5.63 - t * 1.01 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(length(p) * 3.89 + time * 0.73) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.73) * p;
	p = fract(p * 2.45) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.58 + time * 0.21, vec3(0.52, 0.50, 0.51), vec3(0.37, 0.37, 0.45), vec3(1.39, 0.77, 1.00), vec3(0.68, 0.70, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
