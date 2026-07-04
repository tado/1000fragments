uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.10;
		float pv = sin(gq.x + time * 1.54) * sin(gq.y - time * 1.75);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.76 + float(zi) * 0.72 + time * 0.35));
		q = rot2(0.94) * q * 0.68 + vec2(0.26, 0.17);
		fw *= 0.63;
	}
	col *= 0.44;
	col = clamp((col - 0.5) * 2.12 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
