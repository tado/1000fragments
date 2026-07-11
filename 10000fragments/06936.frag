uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.91, t * 2.20 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 13.74 - t * 3.96 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 19.88 - t * 3.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.95;
	p += vec2(-0.48, 0.39) * sin(length(p) * 4.72 - time * 0.98) * 0.19;
	p = rot2(p.y * 2.51 + time * 0.46) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.14 + time * 0.03, vec3(0.52, 0.47, 0.57), vec3(0.46, 0.42, 0.39), vec3(0.87, 0.85, 0.86), vec3(0.48, 0.10, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
