uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.28 * jf)) * 0.64;
        xs += sin(length(p - im) * 112.92 - t * 4.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	p *= 3.02;
	p = rot2(time * -1.12) * p;
	p = rot2(1.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
