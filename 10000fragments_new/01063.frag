uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.39 * jf)) * 0.86;
        xs += sin(length(p - im) * 60.08 - t * 11.39 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 4.76 - time * 0.56); }
	p = abs(p) - 0.66;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.22, 0.48), vec3(0.62, 0.82, 0.88), d);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 2.31 + time * 7.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
