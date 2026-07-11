uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 3.29;
		float pv = sin(gq.x + time * 2.42) * sin(gq.y - time * 0.66);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.93 + float(zi) * 0.36 + time * 0.24));
		q = rot2(0.41) * q * 1.64 + vec2(0.19, 0.14);
		fw *= 0.74;
	}
	col *= 0.40;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
