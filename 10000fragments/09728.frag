uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 10.56 - time * 1.32);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 1.80 + float(zi) * 0.40 + time * 0.42));
		q = rot2(1.01) * q * 0.59 + vec2(-0.19, 0.25);
		fw *= 0.57;
	}
	col *= 0.30;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
