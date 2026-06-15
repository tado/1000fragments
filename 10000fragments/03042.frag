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
    float petal = 0.53 + 0.21 * cos(sa * 7 + t * 1.50 + ph);
    v = sin((sr - petal) * 19.12);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.57 * p.y + time * 1.63); p.y += 0.33 / wf * cos(wf * 3.46 * p.x + time * 1.81); }
	p = rot2(length(p) * -3.89 + time * 1.16) * p;
	p = rot2(p.y * -1.49 + time * 0.74) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(2.42) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.15 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
