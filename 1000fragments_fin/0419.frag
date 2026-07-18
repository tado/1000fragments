uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.04 + sin(p.y * 5.23 + t * 5.62) * 4.00 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.37;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	float d = 0.5 + 0.5 * field(p, (time * 0.65), 0.0);
	vec2 hq = rot2(1.11) * p * 16.76;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.92, 0.92, 0.82), vec3(0.13, 0.06, 0.08), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.019, 0.951, 1.006);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
