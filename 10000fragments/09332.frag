uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.18, t * 1.30 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.50) * p;
	p += vec2(0.64, 0.32) * sin(length(p) * 4.60 - time * 1.55) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.11, vec3(0.49, 0.45, 0.49), vec3(0.35, 0.44, 0.50), vec3(1.29, 1.02, 0.83), vec3(0.94, 0.50, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
