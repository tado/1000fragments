uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.70;
	p.x *= resolution.x / resolution.y;
	p *= 2.17;
	p = rot2((time * 0.71) * -0.68) * p;
	vec3 col = mix(vec3(0.028, 0.055, 0.053), vec3(0.030, 0.045, 0.063), clamp(0.5 + p.y * 0.07 + p.x * -0.12, 0.0, 1.0));
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.12 + 0.19 * vec2(sin((time * 0.71) * 1.29 + hc.x * 6.2831853), cos((time * 0.71) * 1.25 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.15, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.109, 1.385, 2.661) + fi * 1.12 + (time * 0.71) * 1.05)) * (0.033 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.051, 0.988, 0.944);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
