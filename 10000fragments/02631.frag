uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.26 * cos(sa * 5 + t * 2.83 + ph);
    v = sin((sr - petal) * 11.88);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.30 * p.y + time * 1.95); p.y += 0.34 / wf * cos(wf * 1.82 * p.x + time * 0.96); }
	p += vec2(0.86, 0.45) * sin(length(p) * 4.48 - time * 0.76) * 0.16;
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.13, vec3(0.53, 0.49, 0.44), vec3(0.38, 0.31, 0.42), vec3(1.30, 0.90, 0.93), vec3(0.33, 0.52, 0.42));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
