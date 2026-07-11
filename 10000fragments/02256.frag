uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.22 * cos(sa * 6 + t * 1.03 + ph);
    v = sin((sr - petal) * 17.08);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.23 * fr * fr; }
	p = fract(p * 1.20) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.48, 0.15), vec3(0.66, 0.51, 0.71), d);
	col = fract(col * 1.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
