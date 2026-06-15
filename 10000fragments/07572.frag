uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.18 * cos(sa * 6 + t * 1.46 + ph);
    v = sin((sr - petal) * 8.74);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.67 * p.y + time * 0.81); p.y += 0.38 / wf * cos(wf * 3.35 * p.x + time * 1.37); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.40, 0.35), vec3(0.61, 0.76, 0.75), d);
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
