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
		vec2 gq = q * 4.61;
		float pv = sin(gq.x + time * 2.49) * sin(gq.y - time * 0.92);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.07 + float(zi) * 0.57 + time * 0.29));
		q = rot2(0.93) * q * 1.70 + vec2(0.01, 0.01);
		fw *= 0.62;
	}
	col *= 0.41;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
