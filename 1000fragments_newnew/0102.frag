uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.70 + t * 1.86 + ph) + sin(p.y * 9.78 - t * 1.86 + ph)
        + sin((p.x + p.y) * 5.30 + t * 1.86 + ph) + sin(length(p) * 9.92 - t * 1.86 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.57; p = rot2(1.15) * p; }
	{ float fr = length(p); p *= 1.0 + -0.46 * fr * fr; }
	p = abs(p) - 0.61;
	p = rot2(p.y * -1.63 + (time * 0.64) * 0.88) * p;
	float d = 0.5 + 0.5 * field(p, (time * 0.64), 0.0);
	vec3 col = mix(vec3(0.74, 0.84, 0.72), vec3(0.14, 0.06, 0.04), d);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 1.07 + (time * 0.64) * 16.04);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.967, 0.992, 0.957) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
