uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 2.37 * sin(t * 0.80) + t * 1.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.78 * p.y + time * 1.63); p.y += 0.35 / wf * cos(wf * 2.31 * p.x + time * 2.05); }
	p = (floor(p * 28.6) + 0.5) / 28.6;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 1.08, 1.03) + vec3(0.06, 0.11, 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
