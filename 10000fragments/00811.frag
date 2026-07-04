uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.31;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 9.36 - t * 5.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	p *= 2.78;
	p = rot2(length(p) * 3.47 + time * 1.17) * p;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.80));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
