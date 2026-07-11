uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.92 - t * 1.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	p = rot2(2.43) * p;
	p = rot2(length(p) * 2.51 + time * 1.11) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
