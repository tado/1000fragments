uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 22.79 - t * 2.99 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 37.71 - t * 2.99 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 3.74 - time * 0.62); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.10 * p.y + time * 1.05); p.y += 0.31 / wf * cos(wf * 2.14 * p.x + time * 1.95); }
	p += vec2(-0.97, 0.64) * sin(length(p) * 4.24 - time * 0.96) * 0.33;
	p = fract(p * 1.24) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.00, vec3(0.40, 0.55, 0.50), vec3(0.39, 0.31, 0.45), vec3(1.04, 1.00, 0.87), vec3(0.03, 0.99, 0.70));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
