uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 14.36 - time * 3.86);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.78 + float(zi) * 0.33 + time * 0.53));
		q = rot2(0.84) * q * 0.81 + vec2(0.07, -0.22);
		fw *= 0.69;
	}
	col *= 0.42;
	col = mod(col * 2.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
