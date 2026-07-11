uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 11.12 - (time * 0.65) * 1.07);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.41, 2.82) + pv * 2.02 + float(zi) * 0.64 + (time * 0.65) * 0.16));
		q = rot2(0.47) * q * 1.24 + vec2(-0.15, -0.11);
		fw *= 0.67;
	}
	col *= 0.36;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.65)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 0.990, 1.007) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
