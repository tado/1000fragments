uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec3 col = vec3(0.044, 0.010, 0.052);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.58 + (time * 0.78) * 1.63), sin(fi * 0.58 + (time * 0.78) * 1.63)) * (0.57 + 0.24 * sin(fi * 1.7 + (time * 0.78) * 0.55));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.95, 1.91) + fi * 0.69 + (time * 0.78) * 0.88)) * (0.008 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.973, 1.014, 0.934) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
