uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.58 * jf)) * 0.48;
        xs += sin(length(p - im) * 108.84 - t * 12.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.64, 0.44) * sin(length(p) * 2.23 - time * 0.64) * 0.26;
	p = abs(p);
	p = rot2(time * 0.21) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
