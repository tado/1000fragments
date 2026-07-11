uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.93, t * 1.19 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.93 + sin(p.y * 2.26 + t * 1.18) * 4.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	p = rot2(p.y * 1.26 + time * 0.44) * p;
	p = fract(p * 2.33) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.26, vec3(0.53, 0.54, 0.49), vec3(0.46, 0.42, 0.38), vec3(1.18, 1.36, 1.17), vec3(0.51, 0.52, 0.03));
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
