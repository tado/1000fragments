uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.06, t * 2.14 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.97 + time * 0.87) * p;
	p += vec2(0.21, -0.63) * sin(length(p) * 2.38 - time * 0.89) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.16, vec3(0.51, 0.40, 0.42), vec3(0.31, 0.38, 0.40), vec3(1.01, 1.10, 1.17), vec3(0.65, 0.79, 0.97));
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
