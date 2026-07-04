uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 3.06;
		float pv = sin(gq.x + time * 1.58) * sin(gq.y - time * 1.19);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.75 + float(zi) * 0.47 + time * 0.77));
		q = rot2(0.97) * q * 1.61 + vec2(0.24, -0.13);
		fw *= 0.75;
	}
	col *= 0.33;
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 1.21 + time * 4.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
