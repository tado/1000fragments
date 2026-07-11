uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.84 + jf * 4.0), cos(t * 0.59 * jf)) * 0.56;
        xs += sin(length(p - im) * 191.63 - t * 13.51 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	p += vec2(0.66, 0.92) * sin(length(p) * 2.34 - time * 1.77) * 0.22;
	p = rot2(time * 0.59) * p;
	p = fract(p * 1.24) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.36));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
