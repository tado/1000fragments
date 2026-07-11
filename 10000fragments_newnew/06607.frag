uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 5.51;
		float pv = sin(gq.x + time * 1.98) * sin(gq.y - time * 2.50);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.82 + float(zi) * 0.76 + time * 0.33));
		q = rot2(0.37) * q * 0.80 + vec2(-0.07, -0.28);
		fw *= 0.70;
	}
	col *= 0.37;
	col *= 0.88 + 0.10 * sin(gl_FragCoord.y * 2.92 + time * 10.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
