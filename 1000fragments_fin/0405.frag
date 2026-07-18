uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.45;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.70; kp = rot2(1.99) * kp; kp *= 1.26; }
    v = sin(kp.y * 1.30 - t * 3.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.50;
	p.x = abs(p.x) - 0.41;
	p.x *= resolution.x / resolution.y;
	p *= 2.65;
	float d = 0.5 + 0.5 * field(p, (time * 0.91), 0.0);
	vec2 hq = rot2(0.65) * p * 8.10;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.04, 0.03, 0.00), vec3(0.94, 0.95, 0.74), v);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.947, 0.973, 1.038);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
