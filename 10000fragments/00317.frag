uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.45 + t * 2.51 + ph) + sin(p.y * 14.70 - t * 4.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 2.60 + time * 0.56); }
	p = fract(p * 1.37) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 1.58, 1.01) + vec3(0.27, 0.14, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
