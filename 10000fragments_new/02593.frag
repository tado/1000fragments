uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 1.00 + jf * 4.0), cos(t * 0.58 * jf)) * 0.96;
        xs += sin(length(p - im) * 179.25 - t * 7.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = fract(p * 2.30) - 0.5;
	p = rot2(time * -0.30) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.37));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
