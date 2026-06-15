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
    float petal = 0.41 + 0.30 * cos(sa * 5 + t * 2.51 + ph);
    v = sin((sr - petal) * 12.95);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.99 * p.y + time * 1.89); p.y += 0.27 / wf * cos(wf * 3.90 * p.x + time * 1.07); }
	p = rot2(p.y * -2.85 + time * 0.14) * p;
	p = rot2(length(p) * 1.20 + time * 0.83) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.53 + time * 0.17);
	col = mod(col * 1.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
