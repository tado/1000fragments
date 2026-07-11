uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.70, t * 1.09 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	p = (floor(p * 26.1) + 0.5) / 26.1;
	p = rot2(time * 0.76) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 0.62, 1.39) + vec3(0.25, 0.19, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
