uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.18 * cos(sa * 3.0 + t * 1.04 + ph);
    v = sin((sr - petal) * 16.21);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	p = fract(p * 2.08) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.40, 0.50), vec3(0.93, 0.91, 0.94), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
