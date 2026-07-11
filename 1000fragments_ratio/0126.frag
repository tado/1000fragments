uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.90 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.50 + t * 1.62 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.09 + (time * 0.53) * 0.44) * 0.11;
	p.x += p.y * -0.48;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	p = (floor(p * 19.6) + 0.5) / 19.6;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.22 * p.y + (time * 0.53) * 1.24); p.y += 0.39 / wf * cos(wf * 3.41 * p.x + (time * 0.53) * 2.16); }
	p = rot2((time * 0.53) * 1.16) * p;
	float d = field(p, (time * 0.53), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.62, 0.48, 0.54) + vec3(0.06, 0.10, 0.08);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.993, 0.941) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
