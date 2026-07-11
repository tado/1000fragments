uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.55, t * 1.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.82, lr * 2.70 + time * -0.53); }
	p += vec2(-0.74, 0.64) * sin(length(p) * 5.87 - time * 1.46) * 0.37;
	p = rot2(p.y * -3.63 + time * 0.61) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.89, 1.39, 0.84) + vec3(0.28, 0.28, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
