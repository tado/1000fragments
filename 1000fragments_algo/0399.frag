uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.60 + (time * 0.64) * 0.40) * 0.18;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	vec3 col = vec3(0.026, 0.006, 0.062);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.50 + (time * 0.64) * 2.14), sin(fi * 1.50 + (time * 0.64) * 2.14)) * (0.44 + 0.34 * sin(fi * 1.7 + (time * 0.64) * 1.17));
		vec2 bq = abs(p - q) - vec2(0.09, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.77, 1.53) + fi * 1.50 + (time * 0.64) * 1.18)) * (0.009 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 1.002, 0.946) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
