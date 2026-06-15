uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.57, t * 1.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.71) * p;
	p += vec2(-0.10, -0.45) * sin(length(p) * 3.42 - time * 0.99) * 0.18;
	p = rot2(p.y * -3.85 + time * 0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.18, vec3(0.52, 0.59, 0.48), vec3(0.47, 0.40, 0.49), vec3(1.03, 0.95, 1.26), vec3(0.92, 0.43, 0.37));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
