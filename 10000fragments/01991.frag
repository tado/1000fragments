uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 21.04 - t * 6.05 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 12.93 - t * 6.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 2.43 + time * 0.41) * p;
	p = rot2(2.96) * p;
	p *= 2.47;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.53));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
