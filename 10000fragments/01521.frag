uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.75 - t * 4.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 5.79 - time * 0.49); }
	p *= 2.87;
	p = abs(p) - 0.45;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.31, 1.38, 1.05) + vec3(0.19, 0.07, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
