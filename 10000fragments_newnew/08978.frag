uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.83;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.35)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.99 - t * 3.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.59 * p.y + time * 1.85); p.y += 0.50 / wf * cos(wf * 3.97 * p.x + time * 2.13); }
	p.x += sin(p.y * 6.88 + time * 1.03) * 0.37;
	p = abs(p);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.78;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.80, 1.19, 0.83) + vec3(0.23, 0.16, 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
