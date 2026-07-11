uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.12 * cos(sa * 8 + t * 2.63 + ph);
    v = sin((sr - petal) * 19.08);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -3.67 + time * 0.43) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.36 * p.y + time * 1.23); p.y += 0.49 / wf * cos(wf * 3.06 * p.x + time * 0.98); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.25, 0.36), vec3(0.70, 0.74, 0.70), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
