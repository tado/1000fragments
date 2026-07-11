uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.47 + jf * 4.0), cos(t * 0.37 * jf)) * 0.52;
        xs += sin(length(p - im) * 93.94 - t * 12.32 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	{ p = vec2(atan(p.y, p.x) * 1.22, length(p) * 2.05 - time * 0.75); }
	p = (floor(p * 23.3) + 0.5) / 23.3;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.40));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
