uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.35 * jf)) * 0.67;
        xs += sin(length(p - im) * 189.32 - t * 10.40 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	p = fract(p * 2.00) - 0.5;
	p = rot2(length(p) * 1.34 + time * 1.02) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.44));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
