uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.23 - t * 1.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	p = fract(p * 2.42) - 0.5;
	p = rot2(2.87) * p;
	p += vec2(-0.54, 0.86) * sin(length(p) * 3.24 - time * 1.43) * 0.22;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.97));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
