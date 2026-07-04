uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.15;
		float pv = sin(gq.x + time * 1.92) * sin(gq.y - time * 2.54);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.25 + float(zi) * 0.77 + time * 0.31));
		q = rot2(0.44) * q * 0.77 + vec2(-0.16, 0.15);
		fw *= 0.55;
	}
	col *= 0.42;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
