uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.79;
	p = p.yx;
	p *= 2.73;
	vec3 col = vec3(0.013, 0.026, 0.064);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.41 + 0.21 * vec2(sin((time * 0.73) * 1.62 + hc.x * 6.2831853), cos((time * 0.73) * 1.79 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.26);
		col += (0.5 + 0.5 * cos(vec3(0.851, 1.967, 3.083) + fi * 0.57 + (time * 0.73) * 0.63)) * (0.021 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.006, 0.969, 1.018);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
