uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.00 + sr * 17.01 - t * 3.92 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.90 + jf * 4.0), cos(t * 0.32 * jf)) * 0.42;
        xs += sin(length(p - im) * 205.79 - t * 6.61 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.59, -0.63) * sin(length(p) * 3.81 - time * 1.26) * 0.12;
	p *= 2.75;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.41 * p.y + time * 1.88); p.y += 0.41 / wf * cos(wf * 3.63 * p.x + time * 0.73); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.31 + time * 0.19, vec3(0.56, 0.57, 0.53), vec3(0.49, 0.33, 0.42), vec3(1.22, 1.25, 1.35), vec3(0.92, 0.33, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
