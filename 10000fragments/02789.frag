uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 8.12;
		float pv = sin(gq.x + time * 2.29) * sin(gq.y - time * 0.95);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.78 + float(zi) * 1.46 + time * 0.55));
		q = rot2(1.04) * q * 0.55 + vec2(0.06, -0.22);
		fw *= 0.72;
	}
	col *= 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
