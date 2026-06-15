uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.50 + sin(p.y * 3.01 + t * 1.90) * 1.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	p = rot2(1.07) * p;
	p = rot2(length(p) * 3.57 + time * 0.97) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.16));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
