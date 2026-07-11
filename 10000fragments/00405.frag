uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.17 + t * 0.63 + ph) + sin(p.y * 7.65 - t * 2.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	p += vec2(0.27, -0.13) * sin(length(p) * 4.55 - time * 0.75) * 0.25;
	p = rot2(time * 1.38) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.11, lr * 2.41 + time * 0.19); }
	p *= 2.70;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.49, 0.44), vec3(0.57, 0.64, 0.87), d);
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
