uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.34 * pow(abs(cos(ra * 7.0 + t * 0.63)), 0.57);
    v = sin((rr - pet) * 15.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 5.06 - time * 0.33); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.52, lr * 1.54 + time * 0.22); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.80, 0.69, 0.22) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
