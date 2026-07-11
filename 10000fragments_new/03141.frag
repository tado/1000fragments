uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 5.61 * sin(t * 1.03) + t * 3.78 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.77 * p.y + time * 0.74); p.y += 0.37 / wf * cos(wf * 1.66 * p.x + time * 1.48); }
	p += vec2(-0.88, -0.81) * sin(length(p) * 5.66 - time * 1.61) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.93 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
