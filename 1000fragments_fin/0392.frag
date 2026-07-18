uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.55 + (time * 0.57) * 1.22) * 0.05;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 col = mix(vec3(0.078, 0.044, 0.034), vec3(0.085, 0.040, 0.032), clamp(0.5 + p.y * 0.26 + p.x * -0.24, 0.0, 1.0));
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.06 + (time * 0.57) * 2.13), sin(fi * 2.06 + (time * 0.57) * 2.13)) * (0.69 + 0.19 * sin(fi * 1.7 + (time * 0.57) * 1.96));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(3.129, 4.326, 5.523) + fi * 0.63 + (time * 0.57) * 0.93)) * (0.034 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.985, 1.016, 0.948);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
