uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.81 + sr * 18.61 - t * 4.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.14;
	p = abs(p) - 0.44;
	p += vec2(-0.12, -0.55) * sin(length(p) * 3.81 - time * 1.94) * 0.31;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 1.63 * p.y + time * 1.55); p.y += 0.45 / wf * cos(wf * 3.90 * p.x + time * 1.74); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.01, 1.32, 1.15) + vec3(0.09, 0.18, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
