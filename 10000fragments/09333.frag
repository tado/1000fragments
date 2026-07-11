uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.38 * jf)) * 0.52;
        xs += sin(length(p - im) * 146.10 - t * 5.84 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	p = rot2(p.y * 3.37 + time * 0.22) * p;
	p *= 2.87;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.25));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
