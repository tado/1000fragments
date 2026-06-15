uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.37 + t * 3.31 + ph) + sin(p.y * 13.68 - t * 3.31 + ph)
        + sin((p.x + p.y) * 5.96 + t * 3.31 + ph) + sin(length(p) * 5.38 - t * 3.31 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.47;
	p = rot2(1.24) * p;
	p = abs(p) - 0.56;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 2.38 + time * 0.75); }
	p += vec2(-0.82, -0.89) * sin(length(p) * 3.61 - time * 0.82) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.81, 0.60, 0.88) + vec3(0.12, 0.19, 0.30);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
