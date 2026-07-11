uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.23;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 9.28 - (time * 0.78) * 2.84);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.09, 2.19) + pv * 3.76 + float(zi) * 0.44 + (time * 0.78) * 0.31));
		q = rot2(0.61) * q * 1.40 + vec2(-0.06, -0.13);
		fw *= 0.69;
	}
	col *= 0.39;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.78)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.986, 0.996) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
