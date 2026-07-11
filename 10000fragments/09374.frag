uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.46 * jf)) * 0.83;
        xs += sin(length(p - im) * 202.86 - t * 4.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	p = rot2(p.y * 1.34 + time * 0.75) * p;
	p = rot2(time * 1.15) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(1.00) * p; }
	p = abs(p) - 0.50;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.18));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
