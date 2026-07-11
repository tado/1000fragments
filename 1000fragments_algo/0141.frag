uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.34 + t * 1.05) - 0.5) * 2.0;
    v = sin((p.y * 7.62 + zx * 1.75 + t * 2.24) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p *= 2.24;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.64 * p.y + (time * 0.68) * 1.00); p.y += 0.48 / wf * cos(wf * 3.77 * p.x + (time * 0.68) * 1.23); }
	p.y += sin(p.x * 2.90 + (time * 0.68) * 1.38) * 0.18;
	p *= 2.09;
	p += vec2(0.36, -0.50) * sin(length(p) * 2.43 - (time * 0.68) * 2.30) * 0.22;
	float d = field(p, (time * 0.68), 0.0);
	vec3 col = vec3(0.46, 0.41, 0.37) * (0.04 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.019, 0.970, 1.002) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
