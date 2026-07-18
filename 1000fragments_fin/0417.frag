uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.40 + vec2(t * 0.77, -t * 1.13) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.68) * 1.06), cos((time * 0.68) * 1.17)) * 0.10;
	float d = 0.5 + 0.5 * field(p, (time * 0.68), 0.0);
	vec2 hq = rot2(1.23) * p * 16.89;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.89 + (time * 0.68) * 0.09, vec3(0.48, 0.51, 0.52), vec3(0.48, 0.50, 0.49), vec3(1.00, 1.02, 0.97), vec3(0.01, 0.37, 0.70)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.011, 1.003, 0.991);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
