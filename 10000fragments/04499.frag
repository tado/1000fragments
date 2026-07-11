uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 12.75 - t * 6.04 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 12.94 - t * 6.04 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.06 * p.y + time * 1.17); p.y += 0.22 / wf * cos(wf * 2.40 * p.x + time * 1.46); }
	p += vec2(-0.57, -0.68) * sin(length(p) * 4.07 - time * 0.60) * 0.28;
	p *= 2.98;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.78 + time * 0.13);
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
