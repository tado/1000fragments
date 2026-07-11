uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 6.96;
		float pv = sin(gq.x + (time * 0.77) * 2.96) * sin(gq.y - (time * 0.77) * 1.66);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.28, 2.56) + pv * 1.64 + float(zi) * 0.95 + (time * 0.77) * 0.53));
		q = rot2(1.04) * q * 1.26 + vec2(-0.24, 0.30);
		fw *= 0.67;
	}
	col *= 0.39;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.77)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.950, 1.013) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
