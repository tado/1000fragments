uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.76) * 0.95) * p;
	vec3 col = mix(vec3(0.061, 0.029, 0.058), vec3(0.063, 0.043, 0.078), clamp(0.5 + p.y * -0.26 + p.x * -0.28, 0.0, 1.0));
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.27 + 0.16 * vec2(sin((time * 0.76) * 1.70 + hc.x * 6.2831853), cos((time * 0.76) * 1.07 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.21, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(4.734, 6.288, 7.843) + fi * 0.65 + (time * 0.76) * 0.39)) * (0.024 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.030, 0.974, 0.995);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
