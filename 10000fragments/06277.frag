uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 3.16;
		float pv = sin(gq.x + time * 0.57) * sin(gq.y - time * 0.91);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.73 + float(zi) * 0.68 + time * 0.60));
		q = rot2(0.67) * q * 0.65 + vec2(0.14, 0.24);
		fw *= 0.75;
	}
	col *= 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
