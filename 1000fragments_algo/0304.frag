uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.41;
	p *= 1.78;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 9.82 - (time * 0.80) * 2.84);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.05) + pv * 3.15 + float(zi) * 1.16 + (time * 0.80) * 0.19));
		q = rot2(0.95) * q * 0.76 + vec2(-0.18, 0.12);
		fw *= 0.63;
	}
	col *= 0.37;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.80)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 0.986, 1.002) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
