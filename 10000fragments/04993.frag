uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 13.65 - t * 1.99 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 12.31 - t * 2.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.84) * p * 16.70;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.79, 0.75, 0.73), vec3(0.14, 0.08, 0.05), v);
	col *= 0.88 + 0.14 * sin(gl_FragCoord.y * 1.45 + time * 9.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
