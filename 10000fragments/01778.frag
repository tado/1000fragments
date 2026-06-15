uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.79 + sr * 6.43 - t * 2.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	p = fract(p * 2.88) - 0.5;
	p += vec2(-0.12, -0.23) * sin(length(p) * 5.94 - time * 1.37) * 0.13;
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.04, 0.55), vec3(0.81, 0.89, 0.53), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
