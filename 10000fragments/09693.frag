uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 27.76 - t * 6.70 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 24.58 - t * 6.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.04) - 0.5;
	p += vec2(-0.84, 0.89) * sin(length(p) * 3.94 - time * 0.78) * 0.37;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.74 * p.y + time * 1.26); p.y += 0.46 / wf * cos(wf * 2.77 * p.x + time * 1.80); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.06, vec3(0.59, 0.55, 0.51), vec3(0.32, 0.40, 0.47), vec3(1.01, 0.92, 0.74), vec3(0.56, 0.29, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
