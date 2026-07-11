uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.14 * cos(sa * 7 + t * 0.68 + ph);
    v = sin((sr - petal) * 12.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	p = abs(p) - 0.79;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.37, 0.98, 0.79) + vec3(0.29, 0.05, 0.19);
	col = mod(col * 2.19, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
