uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.55 + sr * 13.79 - t * 4.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.15 + jf * 4.0), cos(t * 0.60 * jf)) * 0.42;
        xs += sin(length(p - im) * 123.77 - t * 11.60 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.77 * p.y + time * 1.29); p.y += 0.49 / wf * cos(wf * 3.59 * p.x + time * 1.41); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = d1 + d2;
	vec3 col = palette(d * 1.75 + time * 0.06, vec3(0.46, 0.57, 0.48), vec3(0.39, 0.44, 0.46), vec3(0.79, 1.38, 0.94), vec3(0.80, 0.63, 0.89));
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
