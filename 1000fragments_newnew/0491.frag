uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	vec3 col = vec3(0.005, 0.036, 0.056);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.33 + (time * 0.69) * 1.42), sin(fi * 2.33 + (time * 0.69) * 1.42)) * (0.57 + 0.34 * sin(fi * 1.7 + (time * 0.69) * 1.83));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.52, 1.04) + fi * 1.00 + (time * 0.69) * 0.71)) * (0.011 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(1.014, 1.000, 0.989) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
