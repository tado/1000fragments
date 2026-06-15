uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 16.43 - t * 6.92 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 33.33 - t * 6.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.07 * p.y + time * 1.94); p.y += 0.29 / wf * cos(wf * 3.21 * p.x + time * 1.35); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.06, vec3(0.53, 0.41, 0.41), vec3(0.32, 0.38, 0.35), vec3(0.95, 0.85, 0.93), vec3(0.16, 0.25, 0.19));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
