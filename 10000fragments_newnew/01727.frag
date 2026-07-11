uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.25 + jf * 4.0), cos(t * 0.54 * jf)) * 0.31;
        xs += sin(length(p - im) * 60.36 - t * 8.30 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.29));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.34));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.96 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
