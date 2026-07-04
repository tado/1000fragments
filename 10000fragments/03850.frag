uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 9.73;
		float pv = sin(gq.x + time * 1.10) * sin(gq.y - time * 2.97);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.71 + float(zi) * 0.79 + time * 0.36));
		q = rot2(0.48) * q * 0.71 + vec2(0.08, 0.11);
		fw *= 0.58;
	}
	col *= 0.40;
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
