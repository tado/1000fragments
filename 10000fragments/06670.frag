uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.98, t * 1.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.11) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.26, vec3(0.47, 0.54, 0.48), vec3(0.31, 0.44, 0.40), vec3(0.79, 1.04, 0.73), vec3(0.85, 0.26, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
