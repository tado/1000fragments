uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.19 * jf)) * 0.60;
        xs += sin(length(p - im) * 114.35 - t * 5.06 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 2.44 - time * 0.56); }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
