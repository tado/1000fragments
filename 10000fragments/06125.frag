uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.35 * jf)) * 0.46;
        xs += sin(length(p - im) * 166.70 - t * 4.85 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	p *= 3.16;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(0.67) * p; }
	p = rot2(length(p) * -3.26 + time * 0.95) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.21));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
