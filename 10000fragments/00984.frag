uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.32 + t * 4.46 + ph) + sin(p.y * 2.69 - t * 4.46 + ph)
        + sin((p.x + p.y) * 9.19 + t * 4.46 + ph) + sin(length(p) * 13.33 - t * 4.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.19 + time * 0.85) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 1.11 + time * 0.50); }
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 5.95 - time * 0.63); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.33, 0.56), vec3(0.68, 0.97, 1.00), d);
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
