uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 11.04 - (time * 0.84) * 1.08);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.63, 1.26) + pv * 3.60 + float(zi) * 1.13 + (time * 0.84) * 0.40));
		q = rot2(0.76) * q * 1.41 + vec2(-0.27, -0.08);
		fw *= 0.68;
	}
	col *= 0.40;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 1.003, 0.998) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
