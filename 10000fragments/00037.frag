uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 7.47;
		float pv = sin(gq.x + time * 1.93) * sin(gq.y - time * 0.62);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.78 + float(zi) * 0.99 + time * 0.64));
		q = rot2(1.07) * q * 0.56 + vec2(0.18, -0.15);
		fw *= 0.58;
	}
	col *= 0.42;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
