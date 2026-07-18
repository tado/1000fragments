uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = mix(vec3(0.038, 0.053, 0.052), vec3(0.044, 0.091, 0.036), clamp(0.5 + p.y * -0.36 + p.x * -0.15, 0.0, 1.0));
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.79 + 0.16 * vec2(sin((time * 0.87) * 2.52 + hc.x * 6.2831853), cos((time * 0.87) * 1.20 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(4.646, 5.706, 6.765) + fi * 0.83 + (time * 0.87) * 0.84)) * (0.012 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.027, 0.966, 1.016);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
