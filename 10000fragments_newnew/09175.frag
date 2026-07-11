uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.50 + jf * 4.0), cos(t * 0.29 * jf)) * 0.94;
        xs += sin(length(p - im) * 99.70 - t * 13.23 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.05));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
