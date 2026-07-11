uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.23 * jf)) * 0.99;
        xs += sin(length(p - im) * 167.41 - t * 13.05 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.03));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
