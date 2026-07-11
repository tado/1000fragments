uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.16, t * 1.12 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.47, length(p) * 2.24 - time * 0.12); }
	p = rot2(p.y * 2.75 + time * 0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.19, vec3(0.43, 0.43, 0.45), vec3(0.32, 0.50, 0.37), vec3(0.91, 1.33, 1.00), vec3(0.47, 0.92, 0.01));
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
