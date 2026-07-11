uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.25 * pow(abs(cos(ra * 4.0 + t * 1.17)), 0.99);
    v = sin((rr - pet) * 23.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.21, lr * 2.63 + time * 0.69); }
	p.y += sin(p.x * 6.81 + time * 1.80) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.85, 0.17, 0.38) * (0.12 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.76 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
