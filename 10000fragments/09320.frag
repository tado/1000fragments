uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.12 + jf * 4.0), cos(t * 0.31 * jf)) * 0.77;
        xs += sin(length(p - im) * 135.13 - t * 9.96 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.46));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
