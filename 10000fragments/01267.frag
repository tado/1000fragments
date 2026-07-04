uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 3.52;
		float pv = sin(gq.x + time * 2.27) * sin(gq.y - time * 2.48);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.22 + float(zi) * 0.68 + time * 0.03));
		q = rot2(1.14) * q * 1.46 + vec2(-0.16, -0.16);
		fw *= 0.57;
	}
	col *= 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
