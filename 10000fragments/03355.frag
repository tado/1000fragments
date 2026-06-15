uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.45 + sin(p.y * 2.96 + t * 1.98) * 1.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.23, lr * 2.66 + time * -0.54); }
	p = rot2(p.y * 3.09 + time * 0.37) * p;
	p = rot2(1.03) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.19, 1.40, 1.08) + vec3(0.09, 0.07, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
