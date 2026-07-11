uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.75 + (time * 0.71) * 1.42) * 0.05;
	p.y = abs(p.y) - 0.59;
	p *= 2.36;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 8.19;
		float pv = sin(gq.x + (time * 0.71) * 2.68) * sin(gq.y - (time * 0.71) * 2.89);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + pv * 3.72 + float(zi) * 1.18 + (time * 0.71) * 0.75));
		q = rot2(0.96) * q * 0.83 + vec2(-0.17, -0.07);
		fw *= 0.67;
	}
	col *= 0.41;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.71)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 0.981, 0.919) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
