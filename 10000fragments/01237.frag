uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.14 * jf)) * 0.97;
        xs += sin(length(p - im) * 92.70 - t * 9.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(length(p) * -2.26 + time * 1.09) * p;
	p = rot2(time * 1.14) * p;
	{ float fr = length(p); p *= 1.0 + 0.37 * fr * fr; }
	p = rot2(p.y * -3.86 + time * 0.82) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
