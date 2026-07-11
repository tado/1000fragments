uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.39 * jf)) * 0.74;
        xs += sin(length(p - im) * 116.35 - t * 7.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	p = abs(p) - 0.47;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p = (floor(p * 15.3) + 0.5) / 15.3;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 1.12, 1.25) + vec3(0.04, 0.18, 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
