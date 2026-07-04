uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 11.54 - time * 1.40);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.47 + float(zi) * 1.19 + time * 0.02));
		q = rot2(0.45) * q * 0.80 + vec2(0.25, 0.16);
		fw *= 0.66;
	}
	col *= 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
