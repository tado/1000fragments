uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p *= 1.64;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 11.11 - (time * 0.71) * 4.25);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.65) + pv * 1.77 + float(zi) * 0.76 + (time * 0.71) * 0.12));
		q = rot2(0.63) * q * 1.39 + vec2(0.20, 0.20);
		fw *= 0.71;
	}
	col *= 0.42;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.986, 0.931) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
