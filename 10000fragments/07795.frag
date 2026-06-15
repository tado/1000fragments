uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.15 * cos(sa * 5 + t * 2.41 + ph);
    v = sin((sr - petal) * 10.32);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p = abs(p);
	p = fract(p * 1.34) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.56 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.60, 0.96, 0.64) + vec3(0.03, 0.29, 0.01);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
