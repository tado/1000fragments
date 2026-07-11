uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.58 + t * 3.86 + ph) + sin(p.y * 6.35 - t * 2.85 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 2.81 + time * -0.23); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.52, 1.48, 0.89) + vec3(0.26, 0.24, 0.25);
	col = mod(col * 1.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
