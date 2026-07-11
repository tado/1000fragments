uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.68;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.58)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.89 - t * 3.88 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.49 + vec2(t * 1.40, -t * 2.02) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	p = fract(p * 2.21) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.16 * p.y + time * 1.69); p.y += 0.41 / wf * cos(wf * 2.61 * p.x + time * 1.89); }
	{ float fr = length(p); p *= 1.0 + -0.51 * fr * fr; }
	p += vec2(0.51, 0.99) * sin(length(p) * 2.79 - time * 1.74) * 0.14;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = d1 * d2;
	vec3 col = palette(d * 1.30 + time * 0.05, vec3(0.56, 0.41, 0.49), vec3(0.48, 0.38, 0.42), vec3(0.97, 1.35, 1.07), vec3(0.66, 0.81, 0.78));
	col = mod(col * 1.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
