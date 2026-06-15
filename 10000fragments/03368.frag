uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.45, t * 2.03 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = rot2(length(p) * -2.70 + time * 0.36) * p;
	p = rot2(p.y * -1.77 + time * 0.66) * p;
	p = fract(p * 1.01) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.28, vec3(0.55, 0.53, 0.50), vec3(0.39, 0.36, 0.35), vec3(0.94, 0.89, 1.04), vec3(0.21, 0.72, 0.12));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
