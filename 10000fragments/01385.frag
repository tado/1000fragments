uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.81 + t * 3.90 + ph) + sin(p.y * 10.52 - t * 3.90 + ph)
        + sin((p.x + p.y) * 4.57 + t * 3.90 + ph) + sin(length(p) * 10.72 - t * 3.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.43, lr * 2.38 + time * 0.65); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.14, 0.24), vec3(0.83, 0.88, 0.99), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
