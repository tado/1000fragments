uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.94, t * 2.44 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 0.52) * p;
	p *= 1.80;
	p = fract(p * 2.38) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.11, vec3(0.58, 0.51, 0.44), vec3(0.36, 0.48, 0.42), vec3(1.32, 1.05, 0.80), vec3(0.73, 0.79, 1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
