uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 12.49 - t * 7.84 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 11.90 - t * 7.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.77 * p.y + time * 0.79); p.y += 0.31 / wf * cos(wf * 3.48 * p.x + time * 0.69); }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.85));
	p = (floor(p * 14.7) + 0.5) / 14.7;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.91, 0.80, 0.71) + vec3(0.05, 0.09, 0.12);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
