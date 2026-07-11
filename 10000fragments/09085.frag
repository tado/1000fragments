uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.46 * jf)) * 0.90;
        xs += sin(length(p - im) * 156.18 - t * 5.40 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.80, 0.74) * sin(length(p) * 3.72 - time * 1.80) * 0.40;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.18));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
