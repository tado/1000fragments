uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.54 + jf * 4.0), cos(t * 0.26 * jf)) * 0.55;
        xs += sin(length(p - im) * 218.66 - t * 5.50 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.07) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(0.74) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 2.63 + time * 16.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
