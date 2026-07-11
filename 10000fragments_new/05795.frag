uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.26 * pow(abs(cos(ra * 5.0 + t * 0.70)), 0.69);
    v = sin((rr - pet) * 17.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.20, lr * 1.32 + time * -0.51); }
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.13, 0.41), vec3(0.82, 0.52, 0.80), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
