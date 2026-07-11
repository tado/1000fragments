uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.17 * jf)) * 0.58;
        xs += sin(length(p - im) * 67.21 - t * 6.34 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	p *= 3.00;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.27 * p.y + time * 1.53); p.y += 0.48 / wf * cos(wf * 3.69 * p.x + time * 0.89); }
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.06, vec3(0.59, 0.41, 0.44), vec3(0.45, 0.44, 0.36), vec3(1.23, 0.88, 1.35), vec3(0.22, 0.46, 0.47));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
