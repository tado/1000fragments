uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.79 - t * 6.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	p = rot2(p.y * 2.50 + time * 0.11) * p;
	p = rot2(length(p) * -1.24 + time * 0.32) * p;
	p *= 2.50;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.53));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
