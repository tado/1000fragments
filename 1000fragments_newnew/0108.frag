uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.27 * jf)) * 0.78;
        xs += sin(length(p - im) * 100.09 - t * 13.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.73) * 0.95));
	p = rot2(2.51) * p;
	float d = field(p, (time * 0.73), 0.0);
	vec3 col = vec3(0.47, 0.54, 0.61) * (0.11 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.987, 1.031) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
