uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.47 + jf * 4.0), cos(t * 0.18 * jf)) * 0.33;
        xs += sin(length(p - im) * 215.17 - t * 10.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	{ p = vec2(atan(p.y, p.x) * 2.78, length(p) * 3.09 - time * 0.89); }
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 1.34, 0.78) + vec3(0.01, 0.23, 0.28);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
