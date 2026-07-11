uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.62, t * 0.93 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	{ p = vec2(atan(p.y, p.x) * 1.89, length(p) * 2.89 - time * 0.62); }
	p = rot2(p.y * 1.69 + time * 0.33) * p;
	p = rot2(0.81) * p;
	p = rot2(time * 1.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.09, vec3(0.51, 0.56, 0.46), vec3(0.43, 0.38, 0.33), vec3(0.95, 1.05, 1.38), vec3(0.04, 0.15, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
