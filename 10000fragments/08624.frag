uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 5.46;
		float pv = sin(gq.x + time * 0.50) * sin(gq.y - time * 0.83);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.07 + float(zi) * 0.35 + time * 0.06));
		q = rot2(1.03) * q * 1.76 + vec2(0.17, 0.03);
		fw *= 0.72;
	}
	col *= 0.41;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
