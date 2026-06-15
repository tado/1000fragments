uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.40 + t * 1.24 + ph) + sin(p.y * 11.67 - t * 1.24 + ph)
        + sin((p.x + p.y) * 7.17 + t * 1.24 + ph) + sin(length(p) * 8.55 - t * 1.24 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 1.48 + time * -0.13); }
	p = rot2(length(p) * -2.10 + time * 0.46) * p;
	p = rot2(2.65) * p;
	p += vec2(0.25, -0.61) * sin(length(p) * 3.15 - time * 1.08) * 0.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.15, 0.08), vec3(0.94, 0.97, 0.76), d);
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
