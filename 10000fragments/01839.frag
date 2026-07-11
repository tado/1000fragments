uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.82 + sr * 20.73 - t * 0.72 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.83 * p.y + time * 1.78); p.y += 0.40 / wf * cos(wf * 3.51 * p.x + time * 1.31); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.91));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
