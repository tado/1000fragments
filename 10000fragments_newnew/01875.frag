uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.80, t * 0.52 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	{ p = vec2(atan(p.y, p.x) * 1.89, length(p) * 2.15 - time * 0.36); }
	p = rot2(p.y * -2.89 + time * 0.20) * p;
	p = abs(p) - 0.21;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.53 + time * 0.05, vec3(0.55, 0.56, 0.42), vec3(0.34, 0.35, 0.31), vec3(0.95, 1.08, 0.97), vec3(0.42, 0.18, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
