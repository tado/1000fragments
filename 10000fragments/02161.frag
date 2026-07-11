uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.79 + sr * 6.22 - t * 4.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.96 * p.y + time * 0.87); p.y += 0.22 / wf * cos(wf * 1.71 * p.x + time * 1.60); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.20, vec3(0.41, 0.51, 0.48), vec3(0.48, 0.48, 0.50), vec3(1.21, 1.18, 0.96), vec3(0.98, 0.96, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
