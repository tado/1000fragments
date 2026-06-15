uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.26 * jf)) * 0.87;
        xs += sin(length(p - im) * 69.23 - t * 6.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	p = rot2(p.y * -2.30 + time * 0.67) * p;
	p = fract(p * 2.10) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.12));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
