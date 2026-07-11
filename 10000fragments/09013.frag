uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.44 * jf)) * 0.81;
        xs += sin(length(p - im) * 133.12 - t * 7.85 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.09));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
