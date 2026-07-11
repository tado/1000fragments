uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	p = rot2((time * 0.54) * 0.51) * p;
	vec3 col = vec3(0.035, 0.009, 0.038);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.15 + (time * 0.54) * 0.76), sin(fi * 2.15 + (time * 0.54) * 0.76)) * (0.62 + 0.20 * sin(fi * 1.7 + (time * 0.54) * 1.60));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.90, 1.81) + fi * 1.52 + (time * 0.54) * 1.29)) * (0.013 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.994, 1.002) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
