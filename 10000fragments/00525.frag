uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.70 + sin(p.y * 4.21 + t * 1.49) * 3.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.80 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.24, lr * 1.39 + time * 0.33); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.34, 0.44, 0.01), vec3(0.99, 0.87, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
