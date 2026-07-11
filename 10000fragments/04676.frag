uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 8.75 - t * 7.51 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 10.07 - t * 7.51 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.97 * p.y + time * 1.34); p.y += 0.30 / wf * cos(wf * 3.91 * p.x + time * 1.99); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.92 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
