uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.75 + jf * 4.0), cos(t * 0.28 * jf)) * 0.90;
        xs += sin(length(p - im) * 212.87 - t * 4.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(0.31) * p; }
	p.y += sin(p.x * 4.48 + time * 1.84) * 0.10;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.54));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
