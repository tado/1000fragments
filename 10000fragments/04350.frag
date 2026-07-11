uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 33.81 - t * 3.59 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 38.36 - t * 3.59 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	p = rot2(p.y * 1.75 + time * 0.23) * p;
	p = rot2(2.44) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
