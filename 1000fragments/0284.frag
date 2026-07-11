uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.66 + sr * 4.51 - t * 2.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.69 * p.y + time * 0.63); p.y += 0.45 / wf * cos(wf * 2.11 * p.x + time * 1.13); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.38));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
