uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.13 * cos(sa * 5 + t * 2.16 + ph);
    v = sin((sr - petal) * 13.93);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.56 + jf * 4.0), cos(t * 0.13 * jf)) * 0.53;
        xs += sin(length(p - im) * 160.89 - t * 12.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.78 * p.y + time * 1.68); p.y += 0.31 / wf * cos(wf * 3.58 * p.x + time * 1.29); }
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.09);
	float d = d1 + d2;
	vec3 col = palette(d * 1.29 + time * 0.14, vec3(0.53, 0.53, 0.57), vec3(0.44, 0.47, 0.32), vec3(0.95, 0.76, 0.93), vec3(0.82, 0.07, 0.04));
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
