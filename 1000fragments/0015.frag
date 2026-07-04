uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.35 * pow(abs(cos(ra * 2.0 + t * 1.43)), 1.36);
    v = sin((rr - pet) * 23.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 4.17 - time * 0.95); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.29, 0.15, 0.95) * (0.24 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
