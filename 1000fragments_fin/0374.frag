uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.35;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	vec3 col = mix(vec3(0.049, 0.031, 0.082), vec3(0.048, 0.068, 0.101), clamp(0.5 + p.y * -0.65 + p.x * 0.11, 0.0, 1.0));
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.76 + 0.18 * vec2(sin((time * 0.80) * 1.96 + hc.x * 6.2831853), cos((time * 0.80) * 1.03 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(6.239, 7.527, 8.814) + fi * 1.27 + (time * 0.80) * 1.34)) * (0.026 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.055, 1.002, 0.925);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
