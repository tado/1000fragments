uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.39 * jf)) * 0.73;
        xs += sin(length(p - im) * 134.86 - t * 8.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.40, -0.30) * sin(length(p) * 3.83 - time * 0.54) * 0.38;
	p = rot2(length(p) * 2.93 + time * 1.16) * p;
	p = rot2(p.y * 1.80 + time * 0.38) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.49));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
