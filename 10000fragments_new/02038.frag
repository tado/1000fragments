uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.59 + t * 2.43 + ph) + sin(p.y * 15.78 - t * 4.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.58 * p.y + time * 1.96); p.y += 0.22 / wf * cos(wf * 2.64 * p.x + time * 2.08); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.96));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
