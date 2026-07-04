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
		vec2 gq = q * 5.77;
		float pv = sin(gq.x + time * 2.04) * sin(gq.y - time * 1.00);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.91 + float(zi) * 0.34 + time * 0.12));
		q = rot2(0.47) * q * 1.53 + vec2(-0.01, 0.06);
		fw *= 0.62;
	}
	col *= 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
