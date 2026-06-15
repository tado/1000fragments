uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.20, t * 0.96 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.14 + sin(p.y * 5.09 + t * 4.36) * 1.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p = rot2(time * 0.32) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.11) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = d1 + d2;
	vec3 col = palette(d * 1.75 + time * 0.07, vec3(0.48, 0.56, 0.57), vec3(0.34, 0.48, 0.44), vec3(1.11, 0.71, 1.16), vec3(0.72, 0.33, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
