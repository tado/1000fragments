uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.08 + sr * 13.36 - t * 3.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.99) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.18 * p.y + time * 1.08); p.y += 0.46 / wf * cos(wf * 3.28 * p.x + time * 0.71); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.29, lr * 1.81 + time * 0.49); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.70 + time * 0.28, vec3(0.53, 0.52, 0.42), vec3(0.50, 0.39, 0.46), vec3(0.89, 0.73, 1.25), vec3(0.78, 0.34, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
