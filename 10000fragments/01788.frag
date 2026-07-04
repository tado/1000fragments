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
		vec2 gq = q * 7.62;
		float pv = sin(gq.x + time * 1.82) * sin(gq.y - time * 2.39);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.49 + float(zi) * 1.03 + time * 0.63));
		q = rot2(0.48) * q * 0.80 + vec2(-0.12, 0.16);
		fw *= 0.57;
	}
	col *= 0.42;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
