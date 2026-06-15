uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 12.62 - t * 7.92 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 17.74 - t * 7.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	p += vec2(0.74, 0.38) * sin(length(p) * 2.35 - time * 0.89) * 0.38;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.23 * p.y + time * 1.44); p.y += 0.41 / wf * cos(wf * 2.36 * p.x + time * 2.00); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.14, vec3(0.58, 0.50, 0.58), vec3(0.33, 0.30, 0.40), vec3(0.87, 1.34, 0.98), vec3(0.71, 0.91, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
