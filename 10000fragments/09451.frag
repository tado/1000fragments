uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.28 * jf)) * 0.62;
        xs += sin(length(p - im) * 182.00 - t * 9.60 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	p *= 2.14;
	p = fract(p * 2.50) - 0.5;
	p += vec2(-0.14, 0.15) * sin(length(p) * 2.89 - time * 1.39) * 0.12;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.08));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
