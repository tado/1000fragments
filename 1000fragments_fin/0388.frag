uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.31;
	p.y += sin(p.x * 2.82 + (time * 0.74) * 0.81) * 0.09;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.74) * -0.43) * p;
	vec3 col = mix(vec3(0.045, 0.045, 0.064), vec3(0.073, 0.028, 0.094), clamp(0.5 + p.y * 0.36 + p.x * 0.09, 0.0, 1.0));
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.49 + 0.21 * vec2(sin((time * 0.74) * 2.17 + hc.x * 6.2831853), cos((time * 0.74) * 2.40 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(2.298, 3.822, 5.346) + fi * 1.09 + (time * 0.74) * 1.29)) * (0.018 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.923, 0.996, 1.050);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
