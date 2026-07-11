uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.58 - t * 1.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	p = rot2(p.y * -3.41 + time * 1.17) * p;
	p = rot2(1.40) * p;
	p *= 2.64;
	p = fract(p * 1.79) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.37));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
