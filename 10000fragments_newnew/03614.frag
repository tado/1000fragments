uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 5.45 - time * 2.03);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.64 + float(zi) * 1.46 + time * 0.78));
		q = rot2(0.84) * q * 0.64 + vec2(-0.21, 0.02);
		fw *= 0.59;
	}
	col *= 0.33;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
