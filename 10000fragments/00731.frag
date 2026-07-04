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
		vec2 gq = q * 3.85;
		float pv = sin(gq.x + time * 2.98) * sin(gq.y - time * 2.17);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.91 + float(zi) * 0.69 + time * 0.40));
		q = rot2(0.78) * q * 0.75 + vec2(-0.01, 0.00);
		fw *= 0.64;
	}
	col *= 0.31;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
