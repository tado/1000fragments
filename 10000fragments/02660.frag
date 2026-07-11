uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.16 * cos(sa * 8 + t * 2.70 + ph);
    v = sin((sr - petal) * 8.28);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.42 * p.y + time * 1.51); p.y += 0.31 / wf * cos(wf * 3.14 * p.x + time * 0.94); }
	p += vec2(-0.52, -0.72) * sin(length(p) * 4.84 - time * 0.99) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.21, vec3(0.55, 0.48, 0.52), vec3(0.35, 0.49, 0.48), vec3(0.96, 0.90, 1.02), vec3(0.06, 0.26, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
