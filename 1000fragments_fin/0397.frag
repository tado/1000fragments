uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.62) * 0.35), cos((time * 0.62) * 0.86)) * 0.05;
	p *= 0.81;
	vec3 col = mix(vec3(0.024, 0.033, 0.055), vec3(0.032, 0.032, 0.046), clamp(0.5 + p.y * 0.47 + p.x * -0.01, 0.0, 1.0));
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.57 + 0.27 * vec2(sin((time * 0.62) * 0.84 + hc.x * 6.2831853), cos((time * 0.62) * 2.78 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(2.752, 4.074, 5.396) + fi * 0.97 + (time * 0.62) * 0.90)) * (0.029 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.051, 0.992, 0.927);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
