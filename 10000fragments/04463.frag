uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.47 * jf)) * 0.34;
        xs += sin(length(p - im) * 73.16 - t * 10.39 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	{ p = vec2(atan(p.y, p.x) * 1.63, length(p) * 4.55 - time * 0.67); }
	{ float fr = length(p); p *= 1.0 + -0.47 * fr * fr; }
	p *= 1.78;
	p += vec2(0.91, 0.82) * sin(length(p) * 5.11 - time * 0.68) * 0.27;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.16, 0.25), vec3(0.71, 0.65, 0.80), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
