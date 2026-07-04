uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 5.99;
		float pv = sin(gq.x + time * 1.18) * sin(gq.y - time * 0.54);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.80 + float(zi) * 1.49 + time * 0.63));
		q = rot2(1.09) * q * 1.48 + vec2(-0.05, -0.15);
		fw *= 0.71;
	}
	col *= 0.38;
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
