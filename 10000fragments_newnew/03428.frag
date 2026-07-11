uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.61;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.35)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.34 - t * 7.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.69 * p.y + time * 1.55); p.y += 0.26 / wf * cos(wf * 1.94 * p.x + time * 2.09); }
	p = fract(p * 2.68) - 0.5;
	p *= 1.0 + 0.29 * sin(time * 1.13);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 1.00; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
