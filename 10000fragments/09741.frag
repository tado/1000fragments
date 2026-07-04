uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 12.00 - time * 3.24);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.50 + float(zi) * 1.11 + time * 0.20));
		q = rot2(0.65) * q * 1.55 + vec2(0.11, -0.19);
		fw *= 0.67;
	}
	col *= 0.32;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
