uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 5.40;
		float pv = sin(gq.x + time * 0.83) * sin(gq.y - time * 1.49);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.76 + float(zi) * 1.06 + time * 0.66));
		q = rot2(1.09) * q * 1.31 + vec2(-0.09, 0.21);
		fw *= 0.65;
	}
	col *= 0.41;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
