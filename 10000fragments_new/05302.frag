uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.20 * pow(abs(cos(ra * 5.0 + t * 2.96)), 2.84);
    v = sin((rr - pet) * 21.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 3.47 - time * 0.76); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.20, vec3(0.43, 0.60, 0.45), vec3(0.43, 0.31, 0.35), vec3(1.17, 0.77, 1.05), vec3(0.16, 0.77, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
