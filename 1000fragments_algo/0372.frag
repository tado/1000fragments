uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.85) * 0.75), cos((time * 0.85) * 0.91)) * 0.14;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	p = rot2((time * 0.85) * -0.41) * p;
	vec3 col = vec3(0.045, 0.040, 0.052);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.00 + (time * 0.85) * 0.78), sin(fi * 1.00 + (time * 0.85) * 0.78)) * (0.44 + 0.23 * sin(fi * 1.7 + (time * 0.85) * 0.54));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.44, 0.88) + fi * 1.41 + (time * 0.85) * 1.04)) * (0.035 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.998, 0.920) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
