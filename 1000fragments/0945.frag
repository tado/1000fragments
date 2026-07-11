uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.43 * jf)) * 0.51;
        xs += sin(length(p - im) * 104.78 - t * 9.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	p = fract(p * 2.76) - 0.5;
	p += vec2(-0.70, 0.75) * sin(length(p) * 4.46 - time * 1.19) * 0.28;
	p = abs(p) - 0.59;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
