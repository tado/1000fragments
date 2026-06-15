uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.48 + jf * 4.0), cos(t * 0.31 * jf)) * 0.72;
        xs += sin(length(p - im) * 89.45 - t * 4.90 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	p = abs(p);
	p = rot2(p.y * -2.06 + time * 0.19) * p;
	p += vec2(0.92, 0.74) * sin(length(p) * 4.94 - time * 0.63) * 0.14;
	p = rot2(time * 0.29) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.79));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
