uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 31.00 - t * 3.78 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 24.11 - t * 3.78 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	p = rot2(time * 0.41) * p;
	p = rot2(length(p) * -1.92 + time * 0.98) * p;
	p += vec2(0.31, -0.10) * sin(length(p) * 4.63 - time * 0.84) * 0.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.93));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
