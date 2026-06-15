uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.86 + sr * 10.78 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	p *= 1.85;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.83 * p.y + time * 0.68); p.y += 0.46 / wf * cos(wf * 2.20 * p.x + time * 1.49); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.29, vec3(0.58, 0.52, 0.41), vec3(0.39, 0.50, 0.34), vec3(1.06, 1.09, 1.21), vec3(0.20, 0.44, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
