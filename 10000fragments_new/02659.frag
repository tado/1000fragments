uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.26 + jf * 4.0), cos(t * 0.12 * jf)) * 0.80;
        xs += sin(length(p - im) * 86.67 - t * 5.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	p = fract(p * 1.51) - 0.5;
	p = rot2(p.y * 1.82 + time * 0.24) * p;
	{ p = vec2(atan(p.y, p.x) * 2.51, length(p) * 3.67 - time * 0.22); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.49, 0.28, 0.59) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.05 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
