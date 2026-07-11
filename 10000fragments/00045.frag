uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.38 + t * 2.44 + ph) + sin(p.y * 6.40 - t * 3.51 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = fract(p * 2.45) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.13, lr * 2.52 + time * 0.53); }
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.39, 0.02), vec3(0.93, 0.87, 0.98), d);
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
