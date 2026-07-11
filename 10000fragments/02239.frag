uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.27 + sr * 21.62 - t * 2.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.06 * p.y + time * 1.56); p.y += 0.29 / wf * cos(wf * 3.90 * p.x + time * 0.72); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.42, 0.16, 0.17), vec3(0.90, 0.53, 0.83), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
