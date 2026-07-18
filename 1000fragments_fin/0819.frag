uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.79) * 0.62), cos((time * 0.79) * 0.53)) * 0.20;
	p.y += sin(p.x * 0.89 + (time * 0.79) * 0.54) * 0.11;
	vec3 col = mix(vec3(0.037, 0.037, 0.088), vec3(0.032, 0.039, 0.065), clamp(0.5 + p.y * -0.20 + p.x * -0.05, 0.0, 1.0));
	for(int si = 0; si < 6; si++){
		float fs = float(si);
		float sp = fs * 1.75 + (time * 0.79) * -0.41;
		float yc = (fs / 6.0 - 0.5) * 1.53 + 0.13 * sin(p.x * 1.29 + sp) + 0.07 * sin(p.x * 1.84 - sp * 0.63);
		float wd = 0.10 + 0.03 * sin(p.x * 1.05 + sp * 1.7);
		float dd = (p.y - yc) / wd;
		float band = exp(-dd * dd * 3.93);
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.737, 6.790, 8.843) + fs * 0.27 + (time * 0.79) * 0.45);
		col += tone * band * 0.39;
	}
	col = col / (1.0 + col * 0.70);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.008, 0.987, 0.993);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
