uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.43 * jf)) * 0.57;
        xs += sin(length(p - im) * 127.28 - t * 13.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	p *= 2.11;
	p += vec2(-0.65, -0.41) * sin(length(p) * 4.12 - time * 1.27) * 0.27;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
