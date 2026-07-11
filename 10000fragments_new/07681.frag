uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 7.70 * sin(t * 1.00) + t * 5.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 3.71 - time * 0.60); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.23 * p.y + time * 1.52); p.y += 0.39 / wf * cos(wf * 1.94 * p.x + time * 1.94); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.13, 0.84, 0.63) + vec3(0.17, 0.14, 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
