uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.25 + jf * 4.0), cos(t * 0.16 * jf)) * 0.45;
        xs += sin(length(p - im) * 179.94 - t * 5.39 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	p += vec2(0.70, 0.60) * sin(length(p) * 3.00 - time * 1.62) * 0.11;
	p = fract(p * 2.95) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.58));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
