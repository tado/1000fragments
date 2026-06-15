uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 31.11 - t * 4.82 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 30.60 - t * 4.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.58 * p.y + time * 1.23); p.y += 0.27 / wf * cos(wf * 2.96 * p.x + time * 1.17); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.21, vec3(0.50, 0.59, 0.56), vec3(0.47, 0.41, 0.32), vec3(1.21, 1.05, 0.74), vec3(0.20, 0.16, 0.99));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
