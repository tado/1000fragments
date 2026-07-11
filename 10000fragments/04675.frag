uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 33.96 - t * 2.57 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 21.24 - t * 2.57 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.11 * p.y + time * 1.64); p.y += 0.41 / wf * cos(wf * 2.02 * p.x + time * 1.65); }
	p = rot2(length(p) * 2.65 + time * 0.45) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.13, 0.33), vec3(0.93, 0.74, 0.75), d);
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
