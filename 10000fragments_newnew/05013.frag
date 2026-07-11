uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 9.90 - time * 1.02);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.02 + float(zi) * 0.65 + time * 0.75));
		q = rot2(0.57) * q * 0.77 + vec2(-0.28, 0.14);
		fw *= 0.71;
	}
	col *= 0.40;
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 2.60 + time * 15.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
