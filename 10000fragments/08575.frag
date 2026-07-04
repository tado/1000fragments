uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.31 + sr * 18.78 - t * 3.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.62 * p.y + time * 2.00); p.y += 0.37 / wf * cos(wf * 2.81 * p.x + time * 1.65); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.26, 0.60, 0.19) * (0.06 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
