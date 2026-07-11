uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.86 + jf * 4.0), cos(t * 0.58 * jf)) * 0.49;
        xs += sin(length(p - im) * 141.86 - t * 4.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	p.x += sin(p.y * 5.52 + time * 3.03) * 0.27;
	p = fract(p * 1.98) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.57 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 1.03, 1.46) + vec3(0.29, 0.11, 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
