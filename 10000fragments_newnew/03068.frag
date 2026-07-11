uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 11.54 - time * 3.69);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.06 + float(zi) * 0.50 + time * 0.78));
		q = rot2(1.18) * q * 1.75 + vec2(0.30, -0.02);
		fw *= 0.57;
	}
	col *= 0.36;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
