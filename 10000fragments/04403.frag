uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 13.49 - t * 6.12 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 29.05 - t * 6.12 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.84 * p.y + time * 0.72); p.y += 0.31 / wf * cos(wf * 2.00 * p.x + time * 0.86); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.17);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
