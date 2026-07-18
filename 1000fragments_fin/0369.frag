uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.67;
	vec3 col = mix(vec3(0.038, 0.052, 0.065), vec3(0.077, 0.027, 0.082), clamp(0.5 + p.y * -0.48 + p.x * -0.27, 0.0, 1.0));
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.32 + (time * 0.68) * 2.09), sin(fi * 1.32 + (time * 0.68) * 2.09)) * (0.73 + 0.13 * sin(fi * 1.7 + (time * 0.68) * 1.57));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.908, 2.862, 4.817) + fi * 0.64 + (time * 0.68) * 0.34)) * (0.033 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.997, 0.996, 1.008);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
