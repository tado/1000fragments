uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.77;
	vec3 col = mix(vec3(0.039, 0.046, 0.057), vec3(0.080, 0.036, 0.053), clamp(0.5 + p.y * -0.63 + p.x * -0.25, 0.0, 1.0));
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.98 + 0.26 * vec2(sin((time * 0.81) * 2.86 + hc.x * 6.2831853), cos((time * 0.81) * 1.38 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(4.467, 6.049, 7.632) + fi * 1.53 + (time * 0.81) * 0.50)) * (0.010 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.029, 0.991, 0.923);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
