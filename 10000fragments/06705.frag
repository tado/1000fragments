uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.05, t * 0.45 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.22) * p;
	p = fract(p * 1.08) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.09, vec3(0.54, 0.42, 0.41), vec3(0.33, 0.34, 0.37), vec3(0.86, 0.88, 0.85), vec3(0.11, 0.15, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
