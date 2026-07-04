uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.28 * cos(sa * 3.0 + t * 2.93 + ph);
    v = sin((sr - petal) * 11.11);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p *= 2.94;
	p = rot2(time * 0.51) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.84 * p.y + time * 1.59); p.y += 0.34 / wf * cos(wf * 3.50 * p.x + time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.21 + time * 0.28);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.89 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
