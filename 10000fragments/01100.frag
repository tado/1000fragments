uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.73 + sin(p.y * 4.64 + t * 1.18) * 1.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 1.25 + time * 0.66); }
	p = rot2(2.84) * p;
	p = rot2(time * 1.26) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.18, 0.96, 1.14) + vec3(0.07, 0.28, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
