uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.37 + t * 0.95 + ph) + sin(p.y * 3.58 - t * 1.50 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 3.71 - time * 0.49); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.20; p = rot2(2.23) * p; }
	p = rot2(1.58) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.91 * p.y + time * 0.79); p.y += 0.29 / wf * cos(wf * 3.52 * p.x + time * 1.92); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.14, 0.27), vec3(0.59, 0.53, 0.70), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
