uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 13.95 - (time * 0.72) * 5.43);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.26, 2.53) + pv * 3.58 + float(zi) * 1.11 + (time * 0.72) * 0.17));
		q = rot2(0.99) * q * 0.56 + vec2(-0.01, 0.05);
		fw *= 0.69;
	}
	col *= 0.38;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.72)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 0.997, 0.934) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
