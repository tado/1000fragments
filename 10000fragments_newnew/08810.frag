uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.00, t * 1.44 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	p = rot2(1.10) * p;
	p = rot2(length(p) * -1.82 + time * 1.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.23, vec3(0.53, 0.51, 0.58), vec3(0.42, 0.33, 0.50), vec3(1.10, 0.75, 1.12), vec3(0.72, 0.18, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
