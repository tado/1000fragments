uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 6.32 - time * 2.75);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.39 + float(zi) * 1.43 + time * 0.30));
		q = rot2(0.38) * q * 1.42 + vec2(-0.14, -0.02);
		fw *= 0.59;
	}
	col *= 0.41;
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
