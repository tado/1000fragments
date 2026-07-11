uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.27 + (time * 0.66) * 1.04) * 0.10;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 10.60 - (time * 0.66) * 3.40);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.38, 2.75) + pv * 3.75 + float(zi) * 0.64 + (time * 0.66) * 0.57));
		q = rot2(0.40) * q * 1.63 + vec2(-0.16, -0.16);
		fw *= 0.66;
	}
	col *= 0.42;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.965, 1.027) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
