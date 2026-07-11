uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y) - 0.49;
	p *= 2.32;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 11.09 - (time * 0.58) * 1.55);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.95, 1.91) + pv * 1.99 + float(zi) * 0.33 + (time * 0.58) * 0.04));
		q = rot2(0.86) * q * 0.79 + vec2(-0.23, -0.22);
		fw *= 0.60;
	}
	col *= 0.31;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.58)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.989, 1.017) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
