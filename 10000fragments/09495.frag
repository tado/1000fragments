uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.40;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.65 - t * 3.39 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.75 + vec2(t * 1.31, -t * 2.27) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.82 * p.y + time * 1.79); p.y += 0.22 / wf * cos(wf * 3.66 * p.x + time * 2.14); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.09 + time * 0.27, vec3(0.42, 0.44, 0.51), vec3(0.46, 0.47, 0.47), vec3(0.91, 0.76, 0.96), vec3(0.78, 0.93, 0.71));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
