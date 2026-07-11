uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.47 * jf)) * 0.81;
        xs += sin(length(p - im) * 76.76 - t * 13.42 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 3.41 - time * 0.75); }
	p = rot2(length(p) * 3.96 + time * 0.40) * p;
	p = rot2(p.y * 2.24 + time * 0.10) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.63));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
