uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.34 * jf)) * 0.90;
        xs += sin(length(p - im) * 186.24 - t * 8.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	p = rot2(1.01) * p;
	p = rot2(length(p) * 1.46 + time * 0.55) * p;
	p.y += sin(p.x * 7.50 + time * 2.64) * 0.36;
	p = rot2(p.y * -2.09 + time * 0.47) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.44));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
