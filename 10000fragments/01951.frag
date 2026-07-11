uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.12 + sr * 10.16 - t * 0.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.33, lr * 1.40 + time * -0.79); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.76 * p.y + time * 1.59); p.y += 0.47 / wf * cos(wf * 2.61 * p.x + time * 1.41); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.37, 0.47), vec3(0.89, 0.71, 0.94), d);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
