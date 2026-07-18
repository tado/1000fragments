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
    float ma = sin(length(p - vec2(0.24, 0.0)) * 32.91 - t * 3.56 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 19.15 - t * 4.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p *= 2.22;
	float d = 0.5 + 0.5 * field(p, (time * 0.61), 0.0);
	vec2 hq = rot2(0.27) * p * 21.82;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.34 + (time * 0.61) * 0.23, vec3(0.71, 0.62, 0.64), vec3(0.26, 0.24, 0.20), vec3(1.01, 1.04, 0.98), vec3(0.91, 0.06, 0.08)) * v;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.939, 0.984, 1.057);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
