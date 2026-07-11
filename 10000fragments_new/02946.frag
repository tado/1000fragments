uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.18 * cos(sa * 9.0 + t * 1.18 + ph);
    v = sin((sr - petal) * 13.00);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 3.15 - time * 0.39); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.79, 0.93, 1.08) + vec3(0.29, 0.25, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
