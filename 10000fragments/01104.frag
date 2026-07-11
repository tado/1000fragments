uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.61 + t * 3.14 + ph) + sin(p.y * 2.12 - t * 3.14 + ph)
        + sin((p.x + p.y) * 5.71 + t * 3.14 + ph) + sin(length(p) * 15.10 - t * 3.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	p = rot2(time * 0.80) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.70 * p.y + time * 1.79); p.y += 0.44 / wf * cos(wf * 3.11 * p.x + time * 1.21); }
	p += vec2(-0.33, 0.92) * sin(length(p) * 4.09 - time * 0.77) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.86 + time * 0.24);
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
