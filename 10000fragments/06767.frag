uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.94, t * 2.10 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p += vec2(0.84, 0.12) * sin(length(p) * 3.27 - time * 0.64) * 0.26;
	p = rot2(p.y * 2.95 + time * 0.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.12, vec3(0.60, 0.54, 0.46), vec3(0.44, 0.43, 0.32), vec3(0.75, 1.08, 1.30), vec3(0.63, 0.03, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
