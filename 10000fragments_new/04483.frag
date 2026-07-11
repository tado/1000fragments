uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.22 * pow(abs(cos(ra * 4.0 + t * 2.77)), 2.24);
    v = sin((rr - pet) * 21.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.12 * p.y + time * 2.09); p.y += 0.22 / wf * cos(wf * 3.47 * p.x + time * 2.01); }
	p = (floor(p * 14.4) + 0.5) / 14.4;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.68 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
