uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.67) * 0.83), cos((time * 0.67) * 0.45)) * 0.17;
	p = p.yx;
	p *= 2.15;
	p = rot2((time * 0.67) * -0.84) * p;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.17 * sin((time * 0.67) * 1.69), -0.06 + 0.09 * cos((time * 0.67) * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.87);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.06)) * vec3(0.57, 0.52, 0.53) + vec3(0.11, 0.04, 0.08);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.973, 1.054) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
