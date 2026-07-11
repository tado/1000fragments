uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.13 * jf)) * 0.57;
        xs += sin(length(p - im) * 196.43 - t * 5.96 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.38; p = rot2(2.45) * p; }
	{ float fr = length(p); p *= 1.0 + 0.61 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.73));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
