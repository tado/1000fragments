uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.30 * cos(sa * 8 + t * 2.97 + ph);
    v = sin((sr - petal) * 16.49);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.74 * p.y + time * 1.97); p.y += 0.28 / wf * cos(wf * 2.07 * p.x + time * 1.23); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.09, vec3(0.56, 0.42, 0.44), vec3(0.49, 0.37, 0.48), vec3(1.11, 0.78, 0.70), vec3(0.79, 0.91, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
