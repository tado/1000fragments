uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.36 * jf)) * 0.67;
        xs += sin(length(p - im) * 159.57 - t * 7.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 3.32 - time * 0.38); }
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(0.78) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.74));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
