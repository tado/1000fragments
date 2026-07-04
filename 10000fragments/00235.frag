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
		float pv = sin(length(q) * 8.88 - time * 1.80);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.84 + float(zi) * 1.30 + time * 0.20));
		q = rot2(0.99) * q * 0.81 + vec2(-0.19, -0.28);
		fw *= 0.66;
	}
	col *= 0.38;
	col = mod(col * 2.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
