uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.31 * jf)) * 0.66;
        xs += sin(length(p - im) * 163.03 - t * 12.78 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.77, 0.01) * sin(length(p) * 5.66 - time * 1.23) * 0.36;
	p = fract(p * 2.58) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
