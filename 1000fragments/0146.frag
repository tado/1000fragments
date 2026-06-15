uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.22 * jf)) * 0.59;
        xs += sin(length(p - im) * 132.37 - t * 12.36 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	p = rot2(3.02) * p;
	p += vec2(-0.73, -0.01) * sin(length(p) * 3.77 - time * 1.02) * 0.25;
	p = rot2(time * -1.23) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.50));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
