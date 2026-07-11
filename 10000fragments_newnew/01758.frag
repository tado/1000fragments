uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.35;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.04 - t * 4.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	p = (floor(p * 21.8) + 0.5) / 21.8;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.44 * p.y + time * 1.25); p.y += 0.32 / wf * cos(wf * 3.12 * p.x + time * 1.38); }
	p.y += sin(p.x * 5.98 + time * 2.45) * 0.22;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
