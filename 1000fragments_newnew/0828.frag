uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.30 + t * 0.32) - 0.5) * 2.0;
    v = sin((p.y * 4.53 + zx * 0.50 + t * 2.03) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.94;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.29 * p.y + (time * 0.70) * 1.45); p.y += 0.20 / wf * cos(wf * 2.73 * p.x + (time * 0.70) * 0.73); }
	p = (floor(p * 17.9) + 0.5) / 17.9;
	p = abs(p) - 0.35;
	float d = field(p, (time * 0.70), 0.0);
	vec3 col = vec3(0.64, 0.66, 0.62) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.70)) * 100.0) - 0.5) * 0.04;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 0.985, 1.000) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
