uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.10 * jf)) * 0.44;
        xs += sin(length(p - im) * 92.43 - t * 7.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	p = rot2(time * -0.51) * p;
	p = abs(p) - 0.55;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.08));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
