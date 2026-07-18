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
    vec2 cw = p * 2.09 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.28 + t * 3.20 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.87), 0.0);
	vec2 hq = rot2(1.02) * p * 13.74;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.36 + (time * 0.87) * 0.01, vec3(0.75, 0.57, 0.61), vec3(0.22, 0.24, 0.22), vec3(1.02, 1.01, 0.98), vec3(0.91, 0.01, 0.11)) * v;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.018, 0.970, 1.003);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
