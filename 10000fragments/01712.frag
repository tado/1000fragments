uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.15 * cos(sa * 5 + t * 1.27 + ph);
    v = sin((sr - petal) * 17.90);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.46 * p.y + time * 0.60); p.y += 0.38 / wf * cos(wf * 3.06 * p.x + time * 1.37); }
	p = rot2(length(p) * -2.99 + time * 1.16) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.05, 0.03), vec3(0.76, 0.51, 0.65), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
