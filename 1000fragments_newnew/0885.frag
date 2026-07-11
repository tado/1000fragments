uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	p = rot2((time * 0.69) * -0.67) * p;
	vec3 col = vec3(0.036, 0.037, 0.043);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.69) * 0.59 * (0.3 + fi * 0.06) + fi * 2.4), cos((time * 0.69) * 1.37 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.61;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.70, 1.41) + fi * 1.12 + (time * 0.69) * 1.35)) * (0.036 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.44 + (time * 0.69) * 17.87);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 0.963, 1.026) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
