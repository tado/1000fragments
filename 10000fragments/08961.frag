uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.17 * jf)) * 0.58;
        xs += sin(length(p - im) * 114.95 - t * 7.05 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.59;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 3.29 - time * 0.59); }
	p *= 1.84;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.14, 0.84, 0.50) + vec3(0.16, 0.27, 0.18);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
