uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	p = rot2((time * 0.57) * -0.48) * p;
	vec3 col = vec3(0.056, 0.019, 0.033);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.06 + (time * 0.57) * 0.82), sin(fi * 1.06 + (time * 0.57) * 0.82)) * (0.56 + 0.39 * sin(fi * 1.7 + (time * 0.57) * 0.67));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.94, 1.89) + fi * 1.21 + (time * 0.57) * 0.46)) * (0.030 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.13 * sin(gl_FragCoord.y * 1.56 + (time * 0.57) * 10.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 1.001, 1.003) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
