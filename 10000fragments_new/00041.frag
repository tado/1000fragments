uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 3.08 * sin(t * 0.71) + t * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	p = rot2(time * 0.75) * p;
	p = rot2(p.y * 1.08 + time * 0.99) * p;
	p.x += sin(p.y * 7.15 + time * 2.35) * 0.30;
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 5.95 - time * 0.72); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
