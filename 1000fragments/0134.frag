uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.76 + sr * 4.66 - t * 3.17 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.33 + sr * 23.74 - t * 2.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.07 * p.y + time * 1.57); p.y += 0.34 / wf * cos(wf * 3.84 * p.x + time * 1.01); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 * d2;
	vec3 col = palette(d * 0.88 + time * 0.30, vec3(0.58, 0.53, 0.51), vec3(0.48, 0.32, 0.40), vec3(1.06, 0.85, 0.95), vec3(0.69, 0.89, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
