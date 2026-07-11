uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.67 + sin(p.y * 3.89 + t * 5.87) * 1.05 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.30 + time * 1.21) * p;
	p += vec2(-0.29, 0.82) * sin(length(p) * 4.40 - time * 2.16) * 0.37;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.06 * p.y + time * 1.20); p.y += 0.22 / wf * cos(wf * 2.19 * p.x + time * 1.58); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.53 + time * 0.26);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.83 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
