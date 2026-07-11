uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.50 * jf)) * 0.99;
        xs += sin(length(p - im) * 179.47 - t * 8.00 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p *= 3.14;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 2.29 - time * 0.92); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.74, 0.76, 0.58) * (0.14 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
