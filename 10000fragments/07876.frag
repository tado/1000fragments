uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.54, t * 1.83 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.17) * p;
	p *= 1.90;
	p = rot2(1.85) * p;
	p = fract(p * 1.26) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.26, vec3(0.52, 0.42, 0.58), vec3(0.40, 0.40, 0.42), vec3(1.39, 0.96, 0.92), vec3(0.89, 0.00, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
