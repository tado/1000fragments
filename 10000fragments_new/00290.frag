uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 7.10 * sin(t * 1.45) + t * 1.29 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.51, t * 1.58 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -2.72 + time * 0.82) * p;
	p = rot2(length(p) * 1.04 + time * 1.19) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.10 + time * 0.08, vec3(0.52, 0.50, 0.53), vec3(0.38, 0.33, 0.37), vec3(0.82, 0.87, 1.07), vec3(0.40, 0.43, 0.27));
	col = mod(col * 2.04, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
