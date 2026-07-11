uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.39, t * 1.40 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 5.80 - time * 0.77); }
	p = fract(p * 2.35) - 0.5;
	p = rot2(length(p) * -1.76 + time * 0.84) * p;
	p = abs(p) - 0.73;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.24, vec3(0.45, 0.44, 0.51), vec3(0.36, 0.34, 0.37), vec3(0.83, 1.28, 1.01), vec3(0.48, 0.28, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
