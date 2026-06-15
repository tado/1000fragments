uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.58 * jf)) * 0.87;
        xs += sin(length(p - im) * 86.33 - t * 12.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	p = rot2(p.y * -3.35 + time * 0.94) * p;
	p = rot2(length(p) * 3.67 + time * 0.46) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.71));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
