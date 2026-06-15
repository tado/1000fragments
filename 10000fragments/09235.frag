uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.73 + jf * 4.0), cos(t * 0.44 * jf)) * 0.99;
        xs += sin(length(p - im) * 121.55 - t * 11.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	p += vec2(0.47, 0.49) * sin(length(p) * 5.29 - time * 2.00) * 0.18;
	p = rot2(p.y * -2.67 + time * 0.86) * p;
	{ p = vec2(atan(p.y, p.x) * 2.32, length(p) * 5.56 - time * 0.51); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
