uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 10.73 - t * 1.79 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 34.83 - t * 1.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.07 * p.y + time * 1.05); p.y += 0.48 / wf * cos(wf * 3.47 * p.x + time * 1.55); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.29, vec3(0.41, 0.46, 0.53), vec3(0.46, 0.30, 0.49), vec3(1.27, 0.76, 1.09), vec3(0.79, 0.97, 0.90));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
